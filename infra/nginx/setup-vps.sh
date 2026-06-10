#!/bin/bash
# ZORD — Setup inicial completo na VPS
# Execute como root: bash setup-vps.sh
set -e

DOMAIN="zord.pro"
APP_DIR="/opt/zord"
DB_PASS="$(openssl rand -hex 24)"
REDIS_PASS="$(openssl rand -hex 24)"
JWT_SECRET="$(openssl rand -hex 48)"
JWT_REFRESH="$(openssl rand -hex 48)"
ENC_KEY="$(openssl rand -hex 16)"  # 32 chars hex = 32 bytes AES-256

echo "========================================"
echo "  ZORD — VPS Setup"
echo "  Domain: $DOMAIN"
echo "========================================"

# ── 1. Sistema ─────────────────────────────
echo "→ Atualizando sistema..."
apt-get update -qq && apt-get upgrade -y -qq

apt-get install -y -qq \
  curl git nginx certbot python3-certbot-nginx \
  build-essential ufw fail2ban

# ── 2. Node.js 22 ──────────────────────────
echo "→ Instalando Node.js 22..."
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt-get install -y nodejs
npm install -g pm2 typescript

# ── 3. PostgreSQL 16 ───────────────────────
echo "→ Instalando PostgreSQL 16..."
apt-get install -y postgresql-16 postgresql-client-16

systemctl enable postgresql
systemctl start postgresql

sudo -u postgres psql -c "CREATE USER zord WITH PASSWORD '$DB_PASS';"
sudo -u postgres psql -c "CREATE DATABASE zord_db OWNER zord;"
sudo -u postgres psql -c "CREATE DATABASE zord_shadow OWNER zord;"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE zord_db TO zord;"

# ── 4. Redis ───────────────────────────────
echo "→ Instalando Redis..."
apt-get install -y redis-server
sed -i "s/# requirepass foobared/requirepass $REDIS_PASS/" /etc/redis/redis.conf
systemctl enable redis-server
systemctl restart redis-server

# ── 5. Repositório ─────────────────────────
echo "→ Clonando repositório..."
mkdir -p $APP_DIR
cd $APP_DIR

if [ -d ".git" ]; then
  git pull origin main
else
  git clone https://github.com/SEU_USUARIO/zord.git .
fi

# ── 6. .env de produção ────────────────────
echo "→ Criando .env de produção..."
cat > $APP_DIR/apps/api/.env << EOF
NODE_ENV=production
APP_URL=https://$DOMAIN
API_URL=https://api.$DOMAIN

DATABASE_URL=postgresql://zord:${DB_PASS}@localhost:5432/zord_db
DATABASE_SHADOW_URL=postgresql://zord:${DB_PASS}@localhost:5432/zord_shadow

REDIS_URL=redis://:${REDIS_PASS}@localhost:6379

# Neo4j (Docker — porta local)
NEO4J_URI=bolt://localhost:7687
NEO4J_USERNAME=neo4j
NEO4J_PASSWORD=zord_neo4j_secret

# OpenSearch (Docker — porta local)
OPENSEARCH_URL=http://localhost:9200
OPENSEARCH_USERNAME=admin
OPENSEARCH_PASSWORD=zord_opensearch_secret

# MinIO (Docker — porta local)
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_ACCESS_KEY=zord_minio_access
MINIO_SECRET_KEY=zord_minio_secret
MINIO_BUCKET_EVIDENCE=zord-evidence

JWT_SECRET=${JWT_SECRET}
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=${JWT_REFRESH}
JWT_REFRESH_EXPIRES_IN=7d

ENCRYPTION_KEY=${ENC_KEY}

SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
SMTP_FROM=noreply@$DOMAIN

OPENAI_API_KEY=
ANTHROPIC_API_KEY=
EOF

cat > $APP_DIR/apps/web/.env.local << EOF
NEXT_PUBLIC_API_URL=https://api.$DOMAIN
EOF

# ── 7. Docker (Neo4j, OpenSearch, MinIO) ───
echo "→ Instalando Docker..."
curl -fsSL https://get.docker.com | bash
systemctl enable docker
systemctl start docker

cd $APP_DIR/infra/docker
docker compose up -d neo4j opensearch minio
echo "  Aguardando containers..."
sleep 20

# ── 8. Build & migrate ─────────────────────
echo "→ Instalando dependências..."
cd $APP_DIR
npm install

echo "→ Migrações Prisma..."
cd $APP_DIR/apps/api
npx prisma generate
npx prisma migrate deploy
npx prisma db seed || echo "  (seed ignorado se já existir)"

echo "→ Build de produção..."
cd $APP_DIR
npm run build

# ── 9. PM2 ─────────────────────────────────
echo "→ Configurando PM2..."
cat > $APP_DIR/ecosystem.config.js << 'PMEOF'
module.exports = {
  apps: [
    {
      name: 'zord-web',
      cwd: '/opt/zord/apps/web',
      script: 'node_modules/.bin/next',
      args: 'start -p 3000',
      env: { NODE_ENV: 'production', PORT: 3000 },
      max_memory_restart: '512M',
    },
    {
      name: 'zord-api',
      cwd: '/opt/zord/apps/api',
      script: 'dist/main.js',
      env_file: '/opt/zord/apps/api/.env',
      env: { NODE_ENV: 'production', PORT: 3001 },
      max_memory_restart: '512M',
    },
  ],
}
PMEOF

pm2 start $APP_DIR/ecosystem.config.js
pm2 save
pm2 startup systemd -u root --hp /root | tail -1 | bash

# ── 10. Nginx ──────────────────────────────
echo "→ Configurando Nginx..."
cp $APP_DIR/infra/nginx/zord.conf /etc/nginx/sites-available/zord.conf
ln -sf /etc/nginx/sites-available/zord.conf /etc/nginx/sites-enabled/zord.conf
rm -f /etc/nginx/sites-enabled/default

# SSL primeiro com HTTP (antes do cert)
cat > /etc/nginx/sites-available/zord-temp.conf << 'NGINXEOF'
server {
  listen 80;
  server_name zord.pro www.zord.pro api.zord.pro;
  location /.well-known/acme-challenge/ { root /var/www/html; }
  location / { return 301 https://$host$request_uri; }
}
NGINXEOF
ln -sf /etc/nginx/sites-available/zord-temp.conf /etc/nginx/sites-enabled/zord-temp.conf
nginx -t && systemctl reload nginx

# ── 11. SSL (Let's Encrypt) ────────────────
echo "→ Obtendo certificado SSL..."
certbot certonly --nginx -d $DOMAIN -d www.$DOMAIN -d api.$DOMAIN \
  --non-interactive --agree-tos --email admin@$DOMAIN

rm -f /etc/nginx/sites-enabled/zord-temp.conf
nginx -t && systemctl reload nginx

# ── 12. Firewall ───────────────────────────
echo "→ Configurando firewall..."
ufw allow ssh
ufw allow 80
ufw allow 443
ufw --force enable

# ── 13. Resumo ─────────────────────────────
echo ""
echo "========================================"
echo "  ZORD — Setup concluído!"
echo "========================================"
echo ""
echo "  Frontend: https://$DOMAIN"
echo "  API:      https://api.$DOMAIN"
echo ""
echo "  GUARDE ESTAS CREDENCIAIS:"
echo "  DB Password:      $DB_PASS"
echo "  Redis Password:   $REDIS_PASS"
echo "  JWT Secret:       ${JWT_SECRET:0:20}..."
echo ""
echo "  Preencha as chaves opcionais em:"
echo "  $APP_DIR/apps/api/.env"
echo "  (OPENAI_API_KEY, ANTHROPIC_API_KEY, SMTP_*)"
echo ""
echo "  pm2 status    → ver processos"
echo "  pm2 logs      → ver logs"
