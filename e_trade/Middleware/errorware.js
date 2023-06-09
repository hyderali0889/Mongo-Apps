const errorware = (err, req, res, next) => {
  res.status(err.statusCode).json({
    success: false,
    err: err.message,
  });
  next();
};
module.exports = errorware;
