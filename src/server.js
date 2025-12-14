/**
 * Server bootstrap file.
 * Validates environment configuration and starts the HTTP server.
 */
require('dotenv').config();
const app = require('./app');
const validateEnv = require('./config/validateEnv');
const db = require('./config/db');
const config = require('./config');

async function start() {
  validateEnv();
  // ensures DB is reachable on startup (teacher demo: shows /api/ready works)
  await db.query('SELECT 1');

  app.listen(config.port, () => console.log(`Backend listening on ${config.port}`));
}

start().catch((err) => {
  console.error('Startup failed', err);
  process.exit(1);
});
