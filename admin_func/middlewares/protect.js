const userModel = require("../models/userModel");
const ErrorResponse = require("../utils/ErrorResponse");
const { decode } = require("jsonwebtoken");

exports.protect = async (req, res, next) => {
  let token;

  if (!req.headers.authorization) {
    return next(new ErrorResponse("Please Add Token", 402));
  }

  token = req.headers.authorization;

  const decodedToken = decode(token, "adminSecret");

  const user = await userModel.findById(decodedToken.id);
  if (!user) {
    return next(new ErrorResponse("No User Found", 402));
  }

  req.user = user;
  next();
};

exports.allowByRole =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(`Cannot access this route will role ${req.user.role}`)
      );
    }

    next();
  };
