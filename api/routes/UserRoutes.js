const express = require("express");
const {registerUser , forgotPassword , resetPassword , Login , getUserData , deleteUser} = require("../controllers/UserController");

const Router = express.Router();


Router.route("/Register").post(registerUser);
Router.route("/Login").post(Login);
Router.route("/getUser/:token").get(getUserData);
Router.route("/deleteUser/:token").delete(deleteUser);
Router.route("/ForgotPassword").post(forgotPassword);
Router.route("/ResetPassword/:resettoken").put(resetPassword);

module.exports = Router;