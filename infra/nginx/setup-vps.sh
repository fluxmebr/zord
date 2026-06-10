#!/bin/bash
# ZORD — Setup isolado na VPS
# Não afeta outros projetos: usa Docker para TODOS os bancos,
# portas altas, nginx como site separado, PM2 com nomes únicos.
# Execute como root: bash setup-vps.sh
set -e

APP_DIR="/opt/zord"
DOMAIN="zord.pro"

# Gerar senhas únicas
DB_PASS="$(openssl rand -hex 20)"
REDIS_PASS="$(openssl rand -hex 20)"
NEO4J_PASS="$(openssl rand -hex 16)"
OPENSEARCH_PASS="Zord@$(openssl rand -hex 8)"
MINIO_ACCESS="zord_$(openssl rand -hex 8)"
MINIO_SECRET="$(openssl rand -hex 24)"
JWT_SECRET="$(openssl rand -hex 48)"
JWT_REFRESH="$(openssl rand -hex 48)"
ENC_KEY="$(openssl rand -hex 16)"

echo "════════════════════════════════════════"
echo "  ZORD — Setup isolado"
echo "  Dir: $APP_DIR"
echo "  Domínio: $DOMAIN"
echo "════════════════════════════════════════"
echo ""

# ── 1. Dependências mínimas do sistema ─────
echo "→ [1/10] Instalando dependências..."
apt-get update -qq
apt-get install -y -qq curl git ufw fail2ban openssl

# ── 2. Docker (se não instalado) ───────────
if ! command -v docker &>/dev/null; then
  echo "→ [2/10] Instalando Docker..."
  curl -fsSL https://get.docker.com | bash
  systemctl enable docker
  systemctl start docker
else
  echo "→ [2/10] Docker já instalado ($(docker --version | cut -d' ' -f3))"
fi

# ── 3. Node.js via nvm (isolado por usuário) ─
echo "→ [3/10] Verificando Node.js..."
if ! command -v node &>/dev/null; then
  echo "   Instalando Node.js 22 via NodeSource..."
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
  apt-get install -y nodejs
else
  echo "   Node.js já instalado ($(node --version))"
fi

# PM2 global (nome de processo único — não conflita)
if ! command -v pm2 &>/dev/null; then
  npm install -g pm2
fi

# ── 4. Nginx (se não instalado) ────────────
if ! command -v nginx &>/dev/null; then
  echo "→ [4/10] Instalando Nginx..."
  apt-get install -y nginx
else
  echo "→ [4/10] Nginx já instalado"
fi

# ── 5. Repositório ─────────────────────────
echo "→ [5/10] Clonando repositório..."
if [ -d "$APP_DIR/.git" ]; then
  echo "   Atualizando repositório existente..."
  cd $APP_DIR && git pull origin main
else
  git clone https://github.com/fluxmebr/zord.git $APP_DIR
fi
cd $APP_DIR

# ── 6. Arquivo de variáveis do Docker ──────
echo "→ [6/10] Criando configurações..."

# .env para o docker-compose.prod.yml
cat > $APP_DIR/infra/docker/.env << EOF
DB_PASS=${DB_PASS}
REDIS_PASS=${REDIS_PASS}
NEO4J_PASS=${NEO4J_PASS}
OPENSEARCH_PASS=${OPENSEARCH_PASS}
MINIO_ACCESS=${MINIO_ACCESS}
MINIO_SECRET=${MINIO_SECRET}
EOF

# .env da API (NestJS)
cat > $APP_DIR/apps/api/.env << EOF
NODE_ENV=production
APP_URL=https://${DOMAIN}
API_URL=https://api.${DOMAIN}

# Banco via Docker — porta 15432 (isolada)
DATABASE_URL=postgresql://zord:${DB_PASS}@127.0.0.1:15432/zord_db
DATABASE_SHADOW_URL=postgresql://zord:${DB_PASS}@127.0.0.1:15432/zord_shadow

# Redis via Docker — porta 16379 (isolada)
REDIS_URL=redis://:${REDIS_PASS}@127.0.0.1:16379

# Neo4j via Docker — porta 17687 (isolada)
NEO4J_URI=bolt://127.0.0.1:17687
NEO4J_USERNAME=neo4j
NEO4J_PASSWORD=${NEO4J_PASS}

# OpenSearch via Docker — porta 19200 (isolada)
OPENSEARCH_URL=http://127.0.0.1:19200
OPENSEARCH_USERNAME=admin
OPENSEARCH_PASSWORD=${OPENSEARCH_PASS}

# MinIO via Docker — porta 19000 (isolada)
MINIO_ENDPOINT=127.0.0.1
MINIO_PORT=19000
MINIO_ACCESS_KEY=${MINIO_ACCESS}
MINIO_SECRET_KEY=${MINIO_SECRET}
MINIO_BUCKET_EVIDENCE=zord-evidence

JWT_SECRET=${JWT_SECRET}
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=${JWT_REFRESH}
JWT_REFRESH_EXPIRES_IN=7d

ENCRYPTION_KEY=${ENC_KEY}

# Preencha depois se quiser IA e e-mail:
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
SMTP_FROM=noreply@${DOMAIN}
EOF

# .env.local do Next.js
cat > $APP_DIR/apps/web/.env.local << EOF
NEXT_PUBLIC_API_URL=https://api.${DOMAIN}
EOF

# ── 7. Subir containers Docker ─────────────
echo "→ [7/10] Subindo containers Docker..."
cd $APP_DIR/infra/docker
docker compose -f docker-compose.prod.yml --env-file .env up -d

echo "   Aguardando Postgres ficar saudável..."
until docker exec zord_postgres pg_isready -U zord -d zord_db &>/dev/null; do
  sleep 2
done
echo "   Postgres OK"

# Criar banco shadow para Prisma
docker exec zord_postgres psql -U zord -c "CREATE DATABASE zord_shadow;" 2>/dev/null || true

cd $APP_DIR

# ── 8. Build ───────────────────────────────
echo "→ [8/10] Instalando dependências e buildando..."
npm install
npx prisma generate --schema=apps/api/prisma/schema.prisma
npx prisma migrate deploy --schema=apps/api/prisma/schema.prisma
npx prisma db seed --schema=apps/api/prisma/schema.prisma 2>/dev/null || true
npm run build

# ── 9. PM2 — nomes únicos zord-web / zord-api
echo "→ [9/10] Configurando PM2..."

# Atualizar ecosystem com as portas certas
cat > $APP_DIR/ecosystem.config.js << 'EOF'
module.exports = {
  apps: [
    {
      name: 'zord-web',
      cwd: '/opt/zord/apps/web',
      script: 'node_modules/.bin/next',
      args: 'start -p 4000',
      env: { NODE_ENV: 'production', PORT: 4000 },
      max_memory_restart: '512M',
      error_file: '/opt/zord/logs/web-error.log',
      out_file: '/opt/zord/logs/web-out.log',
    },
    {
      name: 'zord-api',
      cwd: '/opt/zord/apps/api',
      script: 'dist/main.js',
      env_file: '/opt/zord/apps/api/.env',
      env: { NODE_ENV: 'production', PORT: 4001 },
      max_memory_restart: '512M',
      error_file: '/opt/zord/logs/api-error.log',
      out_file: '/opt/zord/logs/api-out.log',
    },
  ],
}
EOF

mkdir -p $APP_DIR/logs
pm2 delete zord-web zord-api 2>/dev/null || true
pm2 start $APP_DIR/ecosystem.config.js
pm2 save
pm2 startup systemd -u root --hp /root 2>/dev/null | grep "sudo" | bash 2>/dev/null || true

# ── 10. Nginx — arquivo separado, não toca nos outros ─
echo "→ [10/10] Configurando Nginx (site separado)..."

# Config temporária para o certbot funcionar
cat > /etc/nginx/sites-available/zord.conf << NGINXEOF
# ZORD Intelligence — configuração isolada
# Proxies para portas 4000 (web) e 4001 (api)

limit_req_zone \$binary_remote_addr zone=zord_api:10m rate=30r/m;
limit_req_zone \$binary_remote_addr zone=zord_auth:10m rate=10r/m;

upstream zord_web { server 127.0.0.1:4000; keepalive 8; }
upstream zord_api { server 127.0.0.1:4001; keepalive 8; }

server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN} www.${DOMAIN} api.${DOMAIN};
    location /.well-known/acme-challenge/ { root /var/www/html; }
    location / { return 301 https://\$host\$request_uri; }
}
NGINXEOF

ln -sf /etc/nginx/sites-available/zord.conf /etc/nginx/sites-enabled/zord.conf
nginx -t && systemctl reload nginx

# Certificado SSL
if ! command -v certbot &>/dev/null; then
  apt-get install -y certbot python3-certbot-nginx
fi

certbot certonly --nginx \
  -d ${DOMAIN} -d www.${DOMAIN} -d api.${DOMAIN} \
  --non-interactive --agree-tos --email admin@${DOMAIN} \
  --redirect 2>/dev/null || echo "   (SSL pulado — configure DNS primeiro)"

# Config final com SSL
cat > /etc/nginx/sites-available/zord.conf << NGINXEOF
# ZORD Intelligence — site isolado em /opt/zord
# Web: porta 4000 | API: porta 4001

limit_req_zone \$binary_remote_addr zone=zord_api:10m rate=30r/m;
limit_req_zone \$binary_remote_addr zone=zord_auth:10m rate=10r/m;

upstream zord_web { server 127.0.0.1:4000; keepalive 8; }
upstream zord_api { server 127.0.0.1:4001; keepalive 8; }

server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN} www.${DOMAIN} api.${DOMAIN};
    location /.well-known/acme-challenge/ { root /var/www/html; }
    location / { return 301 https://\$host\$request_uri; }
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name ${DOMAIN} www.${DOMAIN};

    ssl_certificate /etc/letsencrypt/live/${DOMAIN}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${DOMAIN}/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_session_cache shared:SSL_ZORD:10m;

    add_header Strict-Transport-Security "max-age=63072000" always;
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;

    gzip on;
    gzip_types text/plain text/css application/json application/javascript;

    location / {
        proxy_pass http://zord_web;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }

    location /_next/static {
        proxy_pass http://zord_web;
        add_header Cache-Control "public, immutable, max-age=31536000";
    }
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name api.${DOMAIN};

    ssl_certificate /etc/letsencrypt/live/${DOMAIN}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${DOMAIN}/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;

    add_header Strict-Transport-Security "max-age=63072000" always;
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;

    location /api/v1/auth {
        limit_req zone=zord_auth burst=5 nodelay;
        proxy_pass http://zord_api;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    location / {
        limit_req zone=zord_api burst=20 nodelay;
        proxy_pass http://zord_api;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_read_timeout 120s;
        client_max_body_size 100M;
    }
}
NGINXEOF

nginx -t && systemctl reload nginx

# ── Renovação automática SSL ───────────────
systemctl enable certbot.timer 2>/dev/null || true
systemctl start certbot.timer 2>/dev/null || true

# ── Logrotate para logs PM2 ─────────────────
cat > /etc/logrotate.d/zord << 'LREOF'
/opt/zord/logs/*.log {
    daily
    rotate 14
    compress
    delaycompress
    missingok
    notifempty
    create 0640 root root
}
LREOF

# ── Backup automático do Postgres ──────────
cat > /etc/cron.daily/zord-backup << 'CEOF'
#!/bin/bash
BACKUP_DIR="/opt/zord/backups"
mkdir -p $BACKUP_DIR
docker exec zord_postgres pg_dump -U zord zord_db | gzip > $BACKUP_DIR/zord_$(date +%Y%m%d_%H%M%S).sql.gz
# Manter apenas 7 dias
find $BACKUP_DIR -name "*.sql.gz" -mtime +7 -delete
CEOF
chmod +x /etc/cron.daily/zord-backup

# ── Firewall (apenas abre 80/443, não toca em outras regras) ─
ufw allow 80/tcp 2>/dev/null || true
ufw allow 443/tcp 2>/dev/null || true

# ── Resumo ─────────────────────────────────
echo ""
echo "════════════════════════════════════════"
echo "  ZORD — Setup concluído!"
echo "════════════════════════════════════════"
echo ""
echo "  Frontend: https://${DOMAIN}"
echo "  API:      https://api.${DOMAIN}"
echo "  Dir:      ${APP_DIR}"
echo ""
echo "  PORTAS USADAS (não conflitam):"
echo "  Web:        127.0.0.1:4000"
echo "  API:        127.0.0.1:4001"
echo "  Postgres:   127.0.0.1:15432"
echo "  Redis:      127.0.0.1:16379"
echo "  Neo4j:      127.0.0.1:17687"
echo "  OpenSearch: 127.0.0.1:19200"
echo "  MinIO:      127.0.0.1:19000"
echo ""
echo "  CREDENCIAIS SALVAS EM:"
echo "  ${APP_DIR}/apps/api/.env"
echo "  ${APP_DIR}/infra/docker/.env"
echo ""
echo "  COMANDOS ÚTEIS:"
echo "  pm2 logs zord-web    → logs do frontend"
echo "  pm2 logs zord-api    → logs da API"
echo "  pm2 restart zord-web zord-api"
echo "  docker ps            → containers Docker"
echo "  docker logs zord_postgres"
