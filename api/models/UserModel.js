const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserModel = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6,
    select: false,
  },
  resetPasswordToken: String,
  verificationToken: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Encrypt password using bcrypt
UserModel.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserModel.methods.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
UserModel.methods.sendJwtToken = function () {

    return jwt.sign( { id:this.id , name : this.name } , "DevSecret" , {
       expiresIn : "30d"
      } )

    }
UserModel.methods.createForgotPasswordToken = function () {
  const resetToken = crypto.randomBytes(3).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  return resetToken;
};
UserModel.methods.sendVerificationEmail = function () {
  const verificationToken = crypto.randomBytes(3).toString("hex");
  this.verificationToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");
  return verificationToken;
};

module.exports = mongoose.model("Users", UserModel);
