app.use(helmet());
const cors = require('cors');
const config = require('./config');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(
  cors({
    origin: config.cors.origin,
    credentials: true,
  })
);