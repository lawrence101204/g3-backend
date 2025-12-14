const morgan = require('morgan');

module.exports = () => {
  morgan.token('rid', (req) => req.requestId || '-');
  return morgan(':date[iso] rid=:rid :method :url :status :response-time ms');
};