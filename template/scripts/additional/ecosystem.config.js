module.exports = {
  apps: [
    {
      name: 'strapi',
      cwd: process.env.CMS_APP_ROOT,
      script: 'server.js',
      env: {
        NODE_ENV: 'production',
        PATH: process.env.PATH
      }
    }
  ],
};
