const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AdminModel = mongoose.Schema( {
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
} );


// Encrypt password using bcrypt
AdminModel.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });

  AdminModel.methods.checkPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
  AdminModel.methods.sendJwtToken = function () {

      return jwt.sign( { id:this.id , name : this.name } , "DevSecret" , {
         expiresIn : "30d"
        } )

      }

module.exports = mongoose.model("admin" , AdminModel)