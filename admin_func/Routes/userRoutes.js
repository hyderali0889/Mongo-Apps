const express = require("express");
const { createUser , login ,   getAllUsers ,  forgotPassword , resetToken } = require("../Controllers/userController");
const { protect, allowByRole } = require("../middlewares/protect");

const router = express.Router();


router.route("/register").post(createUser);
router.route("/login").post(login);
router.route("/forgotPassword").post(forgotPassword);
router.route("/resetpassword/:resettoken").put(resetToken);
router.route("/getAllUsers").get( protect , allowByRole("admin") ,getAllUsers);


module.exports = router;