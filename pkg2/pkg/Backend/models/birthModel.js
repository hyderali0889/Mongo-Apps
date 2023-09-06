
const mongoose = require("mongoose");


const birthModel = new mongoose.Schema( {

    fullName:{
        type: String,
        required: [true, "Please add a name"],
     },
     email: {
      type: String,
      required: [true, "Please add an email"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
     fatherFullName:{
        type: String,
        required: [true, "Please add fathers name"],
     },
     fatherCNIC:{
        type: Number,
        required: [true, "Please add father's CNIC"],
        min : 3000000000000,
        max : 3999999999999

     },
     motherFullName:{
        type: String,
        required: [true, "Please add mother name"],
     },
     motherCNIC:{
        type: Number,
        required: [true, "Please add mother's CNIC"],
        min : 3000000000000,
        max : 3999999999999
     },
    sex:{
        type: String,
        required: [true, "Please add gender"],
        enum:["male" , "female"]
     },
     DOB:{
        type:Date,
        required: [true, "Please add your Date of Birth"],


      },
      placeOfBirth:{
        type: String,
        required: [true, "Please add Place of Birth"],
     },
      town:{
        type: String,
        required: [true, "Please add Town / Village"],
     },

    transactionId:Number,
    isAccepted:{
        type:Boolean,
        default:false
     },
     createdAt: {
        type: Date,
        default: Date.now,
      },


 } );



 module.exports = mongoose.model("Birth_Certificates" , birthModel);