const express = require('express');
const { RegisterUser, GetAllUsers , Login , DeleteUser ,  getMe , forgotPassword , resetPassword } = require('../controllers/AuthController');
const { protectRoute } = require('../Middlewares/Protection');
const Router = express.Router();


Router.route( "/register" ).post(RegisterUser);
Router.route( "/login" ).post(Login);
Router.route( "/forgotpassword" ).post(forgotPassword);
Router.route( "/resetpassword/:resettoken" ).put(resetPassword);

module.exports = Router;