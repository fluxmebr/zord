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
