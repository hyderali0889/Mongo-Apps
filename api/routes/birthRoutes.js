const express = require("express");
const {createBirthCertificate , getAllBirthCertificate ,acceptCertificate} = require("../controllers/birthController");

const Router = express.Router();


Router.route("/getAllBirth").get(getAllBirthCertificate);
Router.route("/addBirth").post(createBirthCertificate);
Router.route("/acceptCer/:id").put(acceptCertificate);



module.exports = Router;