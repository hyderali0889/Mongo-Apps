const ErrorResponse = require("../Utils/ErrorResponse");
const birthModel = require("../models/birthModel");
const main = require("../Utils/mailsender");

exports.createBirthCertificate = async (req, res, next) => {
  try {
    await birthModel.create({ ...req.body });

    const message = `We have recieved a request to issue Birth Certificate to ${req.body.fullName}. The Father Name is ${req.body.fatherFullName} with CNIC of ${req.body.fatherCNIC} and Mother Name ${req.body.motherFullName} with CNIC ${req.body.motherCNIC}. \n \n We have Recieved the request and you'll be notified once your Request is verfified.`;

    try {
      await main({
        email: req.body.email,
        subject: "Birth Certificate Registration",
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
exports.getAllBirthCertificate = async (req, res, next) => {
  try {
    const allCertificates = await birthModel.find();

    res.status(200).json({
      success: true,
      allCertificates,
    });
  } catch (error) {
    next(new ErrorResponse(`An Error Occured ${error}`, 400));
  }
};

exports.acceptCertificate = async (req, res, next) => {
  try {
    const cer = await birthModel.findById(req.params.id);

    if (!cer) {
      next(new ErrorResponse(`An Error Occured Form Not Found`, 400));
    }

    cer.isAccepted = true;

    await cer.save();
    const message = "Congrates Your Application has Been Approved and you can collect your Birth Certificate in 3 Days ";


    try {
      await main({
        email: cer.email,
        subject: "Birth Certificate Acception",
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
};
