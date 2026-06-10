#!/bin/bash
# ZORD — Deploy script for zord.pro
# Run on the VPS as root

set -e

DOMAIN="zord.pro"
APP_DIR="/opt/zord"
PM2_APP_WEB="zord-web"
PM2_APP_API="zord-api"

echo "=== ZORD Deploy ==="

# Pull latest code
cd $APP_DIR
git pull origin main

# Install dependencies
npm install

# Build
npm run build

# Run migrations
cd apps/api
npx prisma migrate deploy
npx prisma generate
cd ../..

# Restart PM2 processes
pm2 restart $PM2_APP_WEB || pm2 start "npm run start --workspace=@zord/web" --name $PM2_APP_WEB
pm2 restart $PM2_APP_API || pm2 start "npm run start --workspace=@zord/api" --name $PM2_APP_API

# Reload Nginx
nginx -t && systemctl reload nginx

pm2 save

echo "=== Deploy complete ==="
echo "Frontend: https://$DOMAIN"
echo "API: https://api.$DOMAIN"
