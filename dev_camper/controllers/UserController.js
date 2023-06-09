const UserModels = require("../models/UserModels");
const ErrorResponse = require("../utils/ErrorResponse");

exports.GetAllUsers = async (req, res, next) => {
  try {
    res.status(200).json(res.advancedResults);
  } catch (error) {
    next(new ErrorResponse(`Cannot Add User ${error}`, 400));
  }
};

exports.DeleteUser = async (req, res, next) => {
  try {
    const user = await UserModels.findById(req.params.id);

    if (!user.role === "admin") {
      return next(new ErrorResponse("Only Admins can remove Users", 400));
    }

    res.status(200).json({
      success: true,
      data: "User Deleted",
    });
  } catch (error) {
    next(new ErrorResponse(`Cannot Add User ${error}`, 400));
  }
};

exports.UpdateUser = async (req, res, next) => {
  try {
    const user = await UserModels.findById(req.user.id);

    if (!user) {
      return next(new ErrorResponse("Can't find user Users", 400));
    }

   await UserModels.findByIdAndUpdate(
      req.user.id,
      { email: req.body.email, name: req.body.name },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      data: "User Updated",
    });
  } catch (error) {
    next(new ErrorResponse(`Cannot Add User ${error}`, 400));
  }
};
exports.UpdateUserPassword = async (req, res, next) => {
  try {
    const user = await UserModels.findById(req.user.id).select("+password");

    if (!user) {
      return next(new ErrorResponse("Can't find user Users", 400));
    }
    if (!req.body.currentpassword) {
      return next(new ErrorResponse("Please Enter current password", 400));
    }

    if( !(await user.checkPassword(req.body.currentpassword)) ){
        return next(new ErrorResponse("Wrong current Password", 400));

    }

  user.password = req.body.newpassword;

  await user.save();

    res.status(200).json({
      success: true,
      data: "Password Updated",
    });
  } catch (error) {
    next(new ErrorResponse(`Cannot Update User password ${error}`, 400));
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const user = await UserModels.findById(req.user.id);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(new ErrorResponse(`Cannot Find User ${error}`, 400));
  }
};
