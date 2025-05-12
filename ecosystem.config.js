module.exports = {
  apps: [
    {
      name: 'todo-backend',
      script: 'pnpm',
      args: 'start',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000
      },
    },
  ],
};
