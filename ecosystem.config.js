module.exports = {
  apps: [
    {
      name: 'zord-web',
      cwd: '/opt/zord/apps/web',
      script: 'node_modules/.bin/next',
      args: 'start -p 3000',
      env: { NODE_ENV: 'production', PORT: 3000 },
      max_memory_restart: '512M',
      error_file: '/var/log/pm2/zord-web-error.log',
      out_file: '/var/log/pm2/zord-web-out.log',
    },
    {
      name: 'zord-api',
      cwd: '/opt/zord/apps/api',
      script: 'dist/main.js',
      env_file: '/opt/zord/apps/api/.env',
      env: { NODE_ENV: 'production', PORT: 3001 },
      max_memory_restart: '512M',
      error_file: '/var/log/pm2/zord-api-error.log',
      out_file: '/var/log/pm2/zord-api-out.log',
    },
  ],
}
