const express = require("express");
const {registerUser, Login , getAdminData} = require("../controllers/adminController");

const Router = express.Router();


Router.route("/Register").post(registerUser);
Router.route("/Login").post(Login);
Router.route("/GetAdmin/:token").get(getAdminData)


module.exports = Router;