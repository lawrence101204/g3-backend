app.use(helmet());
const cors = require('cors');
const config = require('./config');

app.use(
  cors({
    origin: config.cors.origin,
    credentials: true,
  })
);