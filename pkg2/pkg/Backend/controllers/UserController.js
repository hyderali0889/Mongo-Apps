const ErrorResponse = require("../Utils/ErrorResponse");
const UserModel = require("../models/UserModel");
const main = require("../Utils/mailsender");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res, next) => {
  try {


    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return next(new ErrorResponse("All Fields are Mandatory", 400));
    }
    const user = await UserModel.create({
      name,
      email,
      password,
    });



    const verificationToken = user.sendVerificationEmail();
    let message = `The Verification Token that is requested is  ${verificationToken}`;

    user.verificationToken = verificationToken;
    await user.save();

    try {
      await main({
        email: email,
        subject: "Verification Token",
        msg: message,
      });

      res.status(200).json({
        success: true,
        data: "Email Sent",
      });
    } catch (error) {
      user.verificationToken = undefined;
      await user.save();
      return next(
        new ErrorResponse(`Cannot send verification token ${error}`, 400)
      );
    }
  } catch (err) {
    next(new ErrorResponse(`Cannot Add User ${err}`, 400));
  }
};


exports.confirmOTP = async (req,res,next) =>{

  try{

    const otp = req.params.otp;

    if (!otp) {
      return next(new ErrorResponse(`Invalid OTP`, 401));
    }

    const user = await UserModel.findOne( { verificationToken : otp } );

    if (!user) {
      return next(new ErrorResponse(`Invalid OTP`, 401));
    }

    const token = user.sendJwtToken();

    res.status(200).json({
      success: true,
      token,
      data: "User Verified",
    });



   }   catch (error) {
    next(new ErrorResponse(`Cannot Verify User ${error}`, 400));
  }
 }

exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorResponse(`Email or password missing`, 401));
    }

    const user = await UserModel.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorResponse(`Invalid Credentials`, 401));
    }

    user.verificationToken = undefined;
    await user.save();

    const matchPasswords = await user.checkPassword(password);

    if (!matchPasswords) {
      return next(new ErrorResponse(`Invalid Credentials`, 401));
    }
    const token = user.sendJwtToken();

    res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    next(new ErrorResponse(`Cannot Login User ${error}`, 400));
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return next(
        new ErrorResponse(`No user found by email ${req.body.email}`, 401)
      );
    }
    const token = user.createForgotPasswordToken();

    await user.save();

    const message = ` To reset your password please use this token ${token}`;

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

    const user = await UserModel.findOne({ resetPasswordToken: resetToken });
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
    await user.save();

    res.status(200).json({
      success: true,
      data: "Password Updated",
    });
  } catch (error) {
    next(new ErrorResponse(`Cannot Reset Password ${error}`, 400));
  }
};

exports.getUserData = async (req,res,next) =>{

  try {
      if(!req.params.token){
          return next(new ErrorResponse("Please add JWT token" , 404))
      }

     const decoded = jwt.verify(req.params.token, "DevSecret");


      const user = await UserModel.findById(decoded.id);

      if(!user){
          return next(new ErrorResponse("No User found" , 404))
      }

      res.status(200).json( {
         "success" : true,
          "email":user
       } )

  } catch (error) {
      next(new ErrorResponse(`Cannot get user ${error}`, 400));
  }
 }

 exports.deleteUser = async (req,res,next) =>{

  try {


  if(!req.params.token){
    return next(new ErrorResponse("Please add JWT token" , 404))
}

const decoded = jwt.verify(req.params.token, "DevSecret");

const user = await UserModel.findById(decoded.id);

if(!user){
    return next(new ErrorResponse("No User found" , 404))
}

await UserModel.findByIdAndRemove(decoded.id);

res.status(200).json({
  success:true,
  "msg" :"User  Deleted"
 })


  } catch (error) {
    next(new ErrorResponse(`Cannot delete user ${error}`, 400));
  }

 }