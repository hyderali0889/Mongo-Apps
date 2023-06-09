const express = require("express");

const router = express.Router();
const {getAllProducts ,AddProduct ,  DeleteProduct , UpdateProduct } = require("../Controllers/ProductsController");
const AdvancedResults = require("../Middleware/AdvancedResults");
const ProductModel = require("../Models/ProductModel");





router.route("/").get(AdvancedResults(ProductModel)  ,getAllProducts).post(AddProduct);
router.route("/:id").get(AdvancedResults(ProductModel) , getAllProducts).put(UpdateProduct).delete(DeleteProduct);


module.exports = router;