const mongoose = require("mongoose");

const deathModel = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Please add Name"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  nextOfKinFullName: {
    type: String,
    required: [true, "Please add next Of Kin's name"],
  },
  nextOfkinCNIC: {
    type: Number,
    required: [true, "Please add next of Kin's CNIC"],
    min: 3000000000000,
    max: 3999999999999,
  },
  DeathCNIC: {
    type: Number,
    required: [true, "Please add next of Kin's CNIC"],
    min: 3000000000000,
    max: 3999999999999,
  },

  sex: {
    type: String,
    required: [true, "Please add gender"],
    enums: ["male", "female"],
  },
  DOD: {
    type: Date,
    required: [true, "Please add Age at Death"],
  },
  placeOfDeath: {
    type: String,
    required: [true, "Please add Place of Death"],
  },
  town: {
    type: String,
    required: [true, "Please add name of your Town / Village"],
  },
  causeOfDeath: {
    type: String,
    required: [true, "Please add Cause of Death"],
  },

  transactionId: Number,
  isAccepted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});



module.exports = mongoose.model("Death_Certificates", deathModel);
