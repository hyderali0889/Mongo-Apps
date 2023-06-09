const express = require("express");
const {
  GetAllUsers,
  DeleteUser,
  UpdateUser,
  UpdateUserPassword,
  getMe,
} = require("../controllers/UserController");
const AdvancedResults = require("../Middlewares/advancedResults");
const { protectRoute } = require("../Middlewares/Protection");
const UserModels = require("../models/UserModels");
const Router = express.Router();

Router.route("/allusers").get(protectRoute,AdvancedResults(UserModels) , GetAllUsers);
Router.route("/remove/:id").delete(protectRoute, DeleteUser);
Router.route("/update").put(protectRoute, UpdateUser);
Router.route("/updatepassword").put(protectRoute, UpdateUserPassword);
Router.route("/me").get(protectRoute, getMe);

module.exports = Router;
