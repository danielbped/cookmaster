const error = async (_err, _req, res, _next) => {
  console.log(_err);
  res.status(500).end();
};

module.exports = (app) => {
  app.use(error);
};