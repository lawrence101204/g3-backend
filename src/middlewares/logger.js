module.exports = (req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const rid = req.id ? ` rid=${req.id}` : '';
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms${rid}`);
  });

  next();
};
