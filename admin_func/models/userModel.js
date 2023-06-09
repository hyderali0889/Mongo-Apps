const { Schema, model } = require( "mongoose");
const bcypt = require( "bcrypt");
const { sign } =  require("jsonwebtoken");
const crypto = require("crypto");



const userModel = new Schema({
  username: {
    type: String,
    required: [true, "Please Enter username"],
  },
  email: {
    type: String,
    required: [true, "Please Enter username"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Please Enter Password with more then 6 digits"],
    select: false,
  },
  role: {
    type: String,
    enum: ["user", "moderator", "admin"],
    default:"user"
  },
  passwordResetToken: String,
  passwordResetExpiry: Date,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

userModel.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const hashed = await bcypt.genSalt(10);
  this.password = await bcypt.hash(this.password, hashed);
});

userModel.methods.comparePasswords = async function (enteredPassword) {
  return await bcypt.compare(enteredPassword, this.password);
};

userModel.methods.sendJWTToken = function(){
  return sign( { id:this._id , username:this.username } , "adminSecret")
 }

 userModel.methods.sendForgotToken = function() {
  const resetToken = crypto.randomBytes(20).toString('hex');


  this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");

  this.passwordResetExpiry = Date.now() + (10 * 60 * 1000);

  return resetToken;

 }

 module.exports = model("users", userModel);

