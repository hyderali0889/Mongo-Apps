const ErrorResponse = require("../Utils/ErrorResponse");
const AdminModel = require("../models/adminModel");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res, next) => {
    try {
      console.log(req.body);

      const {  email, password } = req.body;
      if ( !email || !password) {
        return next(new ErrorResponse("All Fields are Mandatory", 400));
      }
       await AdminModel.create({

        email,
        password,
      });

      res.status(200).json({
        success: true,
        msg:"Admin Added",
      });

    } catch (err) {
      next(new ErrorResponse(`Cannot Add User ${err}`, 400));
    }
  };

  exports.Login = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorResponse(`Email or password missing`, 401));
      }

      const admin = await AdminModel.findOne({ email }).select("+password");

      if (!admin) {
        return next(new ErrorResponse(`Invalid Credentials`, 401));
      }


      const matchPasswords = await admin.checkPassword(password);

      if (!matchPasswords) {
        return next(new ErrorResponse(`Invalid Credentials`, 401));
      }
      const token = admin.sendJwtToken();

      res.status(200).json({
        success: true,
        token,
      });
    } catch (error) {
      next(new ErrorResponse(`Cannot Login User ${error}`, 400));
    }
  };

  exports.getAdminData = async (req,res,next) =>{

    try {
        if(!req.params.token){
            return next(new ErrorResponse("Please add JWT token" , 404))
        }

       const decoded = jwt.verify(req.params.token, "DevSecret");


        const admin = await AdminModel.findById(decoded.id);

        if(!admin){
            return next(new ErrorResponse("No admin found" , 404))
        }

        res.status(200).json( {
           "success" : true,
            "email":admin
         } )

    } catch (error) {
        next(new ErrorResponse(`Cannot get admin ${error}`, 400));
    }
   }