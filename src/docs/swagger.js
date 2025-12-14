const swaggerJSDoc = require('swagger-jsdoc');

module.exports = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: { title: 'Lavera API', version: '1.0.0' },
    servers: [{ url: '/api' }],
  },
  apis: ['./src/routes/*.js'],
});