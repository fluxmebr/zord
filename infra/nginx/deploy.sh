#!/bin/bash
# ZORD — Deploy de atualização (rode após o setup inicial)
set -e

APP_DIR="/opt/zord"
echo "=== ZORD Deploy ==="

cd $APP_DIR
git pull origin main

npm install

cd apps/api
npx prisma generate
npx prisma migrate deploy
cd ../..

npm run build

pm2 restart zord-web zord-api
pm2 save

nginx -t && systemctl reload nginx

echo "=== Deploy completo ==="
echo "Frontend: https://zord.pro"
echo "API:      https://api.zord.pro"
