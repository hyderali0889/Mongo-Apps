const UserModels = require("../models/UserModels");
const ErrorResponse = require("../utils/ErrorResponse");
const main = require("../utils/mailsender");
const crypto = require("crypto");

exports.RegisterUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const user = await UserModels.create({
      name,
      email,
      password,
      role,
    });

    const token = user.sendJwtToken();

    res.status(200).json({
      success: true,
      token
    });
  } catch (error) {
    next(new ErrorResponse(`Cannot Add User ${error}`, 400));
  }
};
exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorResponse(`Email or password missing`, 401));
    }

    const user = await UserModels.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorResponse(`Invalid Credentials`, 401));
    }

    const matchPasswords = await user.checkPassword(password);

    if (!matchPasswords) {
      return next(new ErrorResponse(`Invalid Credentials`, 401));
    }
    const token = user.sendJwtToken();
    
    res.status(200).json({
      success: true,
      token
    });
  } catch (error) {
    next(new ErrorResponse(`Cannot Login User ${error}`, 400));
  }
};


exports.forgotPassword = async (req, res, next) => {
  try {
    const user = await UserModels.findOne({ email: req.body.email });

    if (!user) {
      return next(
        new ErrorResponse(`No user found by email ${req.body.email}`, 401)
      );
    }

    const token = user.createForgotPasswordToken();

    await user.save();

    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/data/v1/auth/resetpassword/${token}`;

    const message = ` To reset your password please send a put req to ${resetURL}`;

    try {
      await main({
        email: user.email,
        subject: "Reset Password Token",
        msg: message,
      });

      return res.status(200).json({
        success: true,
        data: "Email Sent",
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      return next(new ErrorResponse(`Cannot Reset Password ${error}`, 400));
    }
  } catch (error) {
    next(new ErrorResponse(`Cannot Reset Password ${error}`, 400));
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const resetToken = crypto
      .createHash("sha256")
      .update(req.params.resettoken)
      .digest("hex");

    const user = await UserModels.findOne({ resetPasswordToken: resetToken  , resetPasswordExpire:Date().now});
    const password = req.body.password;

    if (!user) {
      return next(
        new ErrorResponse(`No user found by email ${req.body.email}`, 401)
      );
    }
    if (!password) {
      return next(new ErrorResponse(`Please enter new password`, 401));
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      data: "Password Updated",
    });
  } catch (error) {
    next(new ErrorResponse(`Cannot Reset Password ${error}`, 400));
  }
};


