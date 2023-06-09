const userModel = require("../models/userModel");
const main = require("../utils/email");
const ErrorResponse = require("../utils/ErrorResponse");
const crypto = require("crypto");

exports.createUser = async (req, res, next) => {
  try {
    if (!req.body) {
      return next(
        new ErrorResponse(
          `Cannot Add User username , email or password not found`,
          400
        )
      );
    }
    const { username, email, password } = req.body;
    const user = await userModel.create({ username, email, password });

    const userToken = user.sendJWTToken();

    res.status(200).json({
      success: true,
      token: userToken,
    });
  } catch (error) {
    next(new ErrorResponse(`Cannot Add User ${error}`, 400));
  }
};

exports.login = async (req, res, next) => {
  try {
    if (!req.body) {
      return next(
        new ErrorResponse(
          `Cannot Add User username , email or password not found`,
          400
        )
      );
    }
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorResponse(`Invalid Credentials user not found`, 400));
    }

    const comparedPassword = await user.comparePasswords(password);

    if (!comparedPassword) {
      return next(new ErrorResponse(`Invalid Credentials`, 400));
    }

    const userToken = user.sendJWTToken();
    res.status(200).json({
      success: true,
      token: userToken,
    });
  } catch (error) {
    next(new ErrorResponse(`Cannot Login User ${error}`, 400));
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const allusers = await userModel.find();

    res.status(200).json({
      success: true,
      data: allusers,
    });
  } catch (error) {
    next(new ErrorResponse(`Cannot get Users ${error}`, 400));
  }
};
exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return next(new ErrorResponse(`Cannot find Users`, 400));
    }

    const resetToken = user.sendForgotToken();

    await user.save();

    const message = ` To reset password please send put req to ${
      req.protocol
    }://${req.get("host")}/users/resetpassword/${resetToken}`;

    main("Password Reset Token", message, email);

    res.status(200).json({
      success: true,
      data: "Email Sent",
    });
  } catch (error) {
    next(new ErrorResponse(`Cannot send mail ${error}`, 400));
  }
};

exports.resetToken = async (req, res, next) => {
  try {
    if (!req.params.resettoken) {
      return next(new ErrorResponse(`Invalid Request`, 400));
    }

    const { password } = req.body;

    const token = req.params.resettoken;
    console.log(token);

    const encryptedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await userModel.findOne({
      passwordResetToken: encryptedToken,
      passwordResetExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return next(new ErrorResponse(`No User Found`, 400));
    }

    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpiry = undefined;
    await user.save();

    res.status(400).json({ success: true, message: "Password Updated" });
  } catch (error) {
    next(new ErrorResponse(`Cannot send mail ${error}`, 400));
  }
};
