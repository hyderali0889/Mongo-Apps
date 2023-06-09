const BootcampModel = require("../models/BootcampModel");
const ErrorResponse = require("../utils/ErrorResponse");
const busboy = require("connect-busboy");

exports.getBootcamps = async (req, res, next) => {
  try {
    // Response
    res.status(200).json(res.advancedResults);
  } catch (error) {
    next(new ErrorResponse("No Bootcamps Found", 400));
  }
};

exports.getBootcamp = async (req, res, next) => {
  try {
    const singleBootcamp = await BootcampModel.findById(req.params.id);
    if (!singleBootcamp) {
      return next(new ErrorResponse("Bootcamp Not Found", 400));
    }

    res.status(200).json({
      success: true,
      data: singleBootcamp,
    });
  } catch (error) {
    next(new ErrorResponse("Bootcamp Not Found", 400));
  }
};

exports.CreateBootcamp = async (req, res, next) => {
  try {
    req.body.user = req.user.id;
    const user = req.user.id;
    const bootcamp = await BootcampModel.findOne({ user });

    if (bootcamp && req.user.role !== "admin") {
      return next(
        new ErrorResponse("Cannot Create more then one Bootcamp", 400)
      );
    }

    const newBootcamp = await BootcampModel.create(req.body);

    res.status(200).json({
      success: true,
      data: newBootcamp,
    });
  } catch (error) {
    next(new ErrorResponse("Cannot Create Bootcamp", 400));
  }
};

exports.UpdateBootcamp = async (req, res, next) => {
  try {
    let updatedBootcamp = await BootcampModel.findById(req.params.id);

    if (updatedBootcamp.user.toString() !== req.user.id) {
      return next(new ErrorResponse("Only Owners can update Bootcamps", 400));
    }

    if (!updatedBootcamp) {
      return next(new ErrorResponse("Cannot Update Bootcamp", 400));
    }

    updatedBootcamp = await BootcampModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      data: updatedBootcamp,
    });
  } catch (error) {
    next(new ErrorResponse("Cannot Update Bootcamp", 400));
  }
};

exports.DeleteBootcamp = async (req, res, next) => {
  try {
    const deleteBootcamp = await BootcampModel.findById(req.params.id);

    if (deleteBootcamp.user.toString() !== req.user.id) {
      return next(new ErrorResponse("Only Owner can update Bootcamps", 400));
    }

    if (!deleteBootcamp) {
      return next(new ErrorResponse("Cannot Delete Bootcamp", 400));
    }

    deleteBootcamp.remove();

    res.status(200).json({
      success: true,
      data: `${req.params.id} Deleted`,
    });
  } catch (error) {
    next(new ErrorResponse("Cannot Delete Bootcamp", 400));
  }
};
exports.UploadPhoto = async (req, res, next) => {
  try {
    const uploadBootcamp = await BootcampModel.findById(req.params.bootcampId);

    if (uploadBootcamp.user.toString() !== req.user.id) {
      return next(new ErrorResponse("Only Owners can update Bootcamps", 400));
    }

    if (!uploadBootcamp) {
      return next(new ErrorResponse("Cannot Find Bootcamp", 400));
    }
    if (!req.files.file) {
      return next(new ErrorResponse("Please Add a file", 400));
    }
    if (!req.files.file.mimetype.startsWith("image")) {
      return next(new ErrorResponse("Please Add an image file", 400));
    }
    if (uploadBootcamp.photo !== "no-photo.jpg") {
      return next(new ErrorResponse("Image is already added", 200));
    }
    await BootcampModel.findByIdAndUpdate(
      req.params.bootcampId,
      { photo: req.files.file.file },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      success: true,
      data: "Image Uploaded",
    });
  } catch (error) {
    next(new ErrorResponse(`Cannot Upload Photo ${error}`, 400));
  }
};
