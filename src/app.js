/**
 * Application entry configuration.
 * Registers global middlewares, routes, and error handlers.
 * The app instance is exported and started by server.js.
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');

const routes = require('./routes');
const requestId = require('./middlewares/requestId');
const logger = require('./middlewares/logger');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');
const swaggerSpec = require('./docs/swagger');
const config = require('./config');

const app = express();

app.use(requestId); // ✅ correct usage (do not call requestId())
app.use(logger());
app.use(helmet());

app.use(
  cors({
    origin: config.corsOrigins.length ? config.corsOrigins : true,
    credentials: true,
  })
);

app.use(express.json({ limit: '1mb' }));

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api', routes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
