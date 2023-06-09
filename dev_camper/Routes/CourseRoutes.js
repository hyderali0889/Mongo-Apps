const express = require("express");
const {
  getAllCourses,
  getSingleCourse,
  deleteCourse,
  updateCourse,
  createNewCourse
} = require("../controllers/CourseController");
const Router = express.Router();
const AdvancedResults = require("../Middlewares/advancedResults");
const CourseModel = require("../models/CoursesModels");
const { protectRoute, authorizeByRole } = require("../Middlewares/Protection");

Router.route("/")
  .get(AdvancedResults(CourseModel, "bootcamp user"), getAllCourses);

Router.route("/:bootcampid").post(protectRoute, authorizeByRole("publisher", "admin"), createNewCourse);

Router.route("/:id")
  .get(AdvancedResults(CourseModel, "bootcamp"), getSingleCourse)
  .put(protectRoute, authorizeByRole("publisher", "admin"), updateCourse)
  .delete(protectRoute, authorizeByRole("publisher", "admin"), deleteCourse);

module.exports = Router;
