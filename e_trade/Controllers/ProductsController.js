const ProductModel = require("../Models/ProductModel");
const ErrorResponse = require("../utils/ErrorResponse");

exports.getAllProducts = async (req, res, next) => {
  try {
    if (req.params.id) {
      const data = await ProductModel.findById(req.params.id);


      res.status(200).json({
        success: true,
        data,
      });
    } else {
      res.status(200).json(res.advancedResults);
    }
  } catch (error) {
    next(new ErrorResponse(`Cannot Get ALL Products ${error} `, 400));
  }
};

exports.AddProduct = async (req, res, next) => {
  try {

   const products = await ProductModel.create(req.body);
   products.photo =req.files.file.file;
   products.save();


    res.status(200).json({
      success: true,
      data: "Added a new Product",
    });
  } catch (error) {
    next(new ErrorResponse(`Cannot Add a new Product ${error}`, 400));
  }
};

exports.UpdateProduct = async (req, res, next) => {
  try {
    await ProductModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: `Updated ${req.params.id}`,
    });
  } catch (error) {
    next(new ErrorResponse(`Cannot Add a new Product ${error}`, 400));
  }
};

exports.DeleteProduct = async (req, res, next) => {
  try {
    await ProductModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      data: `Deleted ${req.params.id}`,
    });
  } catch (error) {
    next(new ErrorResponse(`Cannot Add a new Product ${error}`, 400));
  }
};
