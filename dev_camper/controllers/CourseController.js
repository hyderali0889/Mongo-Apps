const CourseModel = require("../models/CoursesModels");
const ErrorResponse = require("../utils/ErrorResponse");

exports.getAllCourses = async (req, res, next) => {
  try {
    res.status(200).json(res.advancedResults);
  } catch (error) {
    next(new ErrorResponse(`No Course Found ${error.message}`, 404));
  }
};

exports.getSingleCourse = async (req, res, next) => {
  try {
    let query;

    query = CourseModel.findById(req.params.id);

    const singleCourse = await query;

    if (!singleCourse) {
      return next(new ErrorResponse(`No Courses Found`, 404));
    }

    res.status(200).json({
      success: true,
      data: singleCourse,
    });
  } catch (error) {
    next(new ErrorResponse(`No Course Found ${error.message}`, 404));
  }
};
exports.createNewCourse = async (req, res, next) => {
  try {
    if (!req.params.bootcampid) {
      return next(new ErrorResponse(`Please add bootcamp`, 404));
    }
    req.body.bootcamp = req.params.bootcampid;

    await CourseModel.create(req.body);

    res.status(200).json({
      success: true,
      data: "Added a new Course",
    });
  } catch (error) {
    next(new ErrorResponse(`No Course Found ${error.message}`, 404));
  }
};
exports.updateCourse = async (req, res, next) => {
  try {
    let query = await CourseModel.findById(req.params.id);

    if (!query) {
      return next(new ErrorResponse("No Course Found", 404));
    }

    if (query.user.toString() !== req.user.id) {
      return next(new ErrorResponse("Only Owners can update Courses", 404));
    }

    query = CourseModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    const updatedCourse = await query;

    res.status(200).json({
      success: true,
      data: updatedCourse,
    });
  } catch (error) {
    next(new ErrorResponse(`No Course Found ${error.message}`, 404));
  }
};
exports.deleteCourse = async (req, res, next) => {
  try {
    let query = await CourseModel.findById(req.params.id);

    if (query.user.toString() !== req.user.id) {
      return next(new ErrorResponse("Only Owners can delete Courses", 404));
    }
    await query.remove();

    res.status(200).json({
      success: true,
      data: `Deleted ${req.params.id}`,
    });
  } catch (error) {
    next(new ErrorResponse(`No Course Found ${error.message}`, 404));
  }
};
