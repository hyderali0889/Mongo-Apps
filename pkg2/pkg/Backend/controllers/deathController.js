const ErrorResponse = require("../Utils/ErrorResponse");
const deathModel = require("../models/deathModel");
const main = require("../Utils/mailsender");

exports.createDeathCertificate = async(req, res, next) => {
  try {
    await deathModel.create({ ...req.body });
    const message = `We have recieved a request to issue Death Certificate to ${req.body.fullName} with CNIC ${req.body.DeathCNIC}. The Next of Kin's Name is ${req.body.nextOfKinFullName} with CNIC of ${req.body.nextOfkinCNIC} and Place of Death ${req.body.placeOfDeath} in Town of ${req.body.town}. \n \n We have Recieved the request and you'll be notified once your Request is verfified.`;

    try {
      await main({
        email: req.body.email,
        subject: "Death Certificate Registration",
        msg: message,
      });

      return res.status(200).json({
        success: true,
        data: "Email Sent",
      });
    } catch (error) {
      return next(new ErrorResponse(`Cannot Add Certificate ${error}`, 400));
    }
  } catch (error) {
    next(new ErrorResponse(`An Error Occured ${error}`, 400));
  }
};
exports.getAllDeathCertificates = async(req, res, next) => {
  try {
    const death =await deathModel.find();

    res.status(200).json({
      success: "true",
      death,
    });
  } catch (error) {
    next(new ErrorResponse(`An Error Occured ${error}`, 400));
  }
};

exports.acceptCertificate = async (req,res,next) => {
  try {

   const cer = await deathModel.findById(req.params.id);

   if(!cer){
    next(new ErrorResponse(`An Error Occured Form Not Found`, 400));

   }

   cer.isAccepted = true;

   await cer.save();

   const message = "Congrates Your Application has Been Approved and you can collect your Death Certificate in 3 Days ";


   try {
     await main({
       email: cer.email,
       subject: "Death Certificate Acception",
       msg: message,
     });

     return res.status(200).json({
       success: true,
       data: "Email Sent and Form Accepted",
     });
   } catch (error) {
     return next(new ErrorResponse(`Cannot Add Certificate ${error}`, 400));
   }


  } catch (error) {
   next(new ErrorResponse(`An Error Occured ${error}`, 400));

  }
  }