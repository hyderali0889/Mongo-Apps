const jwt = require("jsonwebtoken");
const userModel = require("../models/UserModels");
const ErrorResponse = require("../Utils/ErrorResponse");

exports.protectRoute = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization) {
      token = req.headers.authorization;
    }
    if (!token) {
      return next(new ErrorResponse("Cannot Access this Route", 401));
    }

    const decoded = jwt.verify(token, "DevSecret");

    const user = await userModel.findById(decoded.id);

    req.user = user;
    next();
  } catch (error) {
    next(new ErrorResponse(`Cannot Access this Route ${error}`, 401));
  }
};

exports.authorizeByRole = (...role) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return next(
          new ErrorResponse(
            `Please Login before attempting to add a bootcamp`,
            401
          )
        );
      }
      if (!role.includes(req.user.role)) {
        return next(
          new ErrorResponse(
            `Cannot Access this Route with role ${req.user.role}`,
            401
          )
        );
      }
      next();
    } catch (error) {
      next(new ErrorResponse(`Cannot Access this Route ${error}`, 401));
    }
  };
};
