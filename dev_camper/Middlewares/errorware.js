const errorware = (err, req, res, next) => {
  res.status(err.statusCode).json({
    success: false,
    error: err.message,
  });
};

module.exports = errorware;
