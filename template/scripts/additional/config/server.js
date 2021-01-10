module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  admin: {
    url: env('ADMIN_URL', '/admin'),
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'd970d3410fbbb50f34a207bbfe0e067c'),
    },
    build: {
      host: "/admin",  // Note: The administration will be accessible from the root of the domain (ex: http//yourfrontend.com/)
      backend: env('URL_ADMIN', "strapi-admin"), // "http://yourbackend.com",
      plugins: {
        source: "backend"
      }
    }
  },
  url: env('URL', 'localhost'),
});
