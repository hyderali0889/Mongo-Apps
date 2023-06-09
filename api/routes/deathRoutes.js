const express = require("express");
const {createDeathCertificate , getAllDeathCertificates , acceptCertificate} = require("../controllers/deathController");

const Router = express.Router();


Router.route("/getAllDeath").get(getAllDeathCertificates);
Router.route("/addDeath").post(createDeathCertificate);
Router.route("/acceptCer/:id").put(acceptCertificate);



module.exports = Router;