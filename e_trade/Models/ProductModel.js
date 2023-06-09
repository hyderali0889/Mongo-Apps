const mongoose = require("mongoose");

const ProductsModel = new mongoose.Schema( {
    title: {
        required:[ true , "Please Enter a title" ],
        type:String,
        unique:true,
        trim:true
    },
    description: {
        required:[ true , "Please Enter Description" ],
        type:String,
        trim:true,
        maxLength:[ 64 , "Please Enter less than 64 Characters" ]
    },
    price:{
        required:[ true , "Please Enter Price" ],
        type:Number,
        trim:true,
     },
     photo:{
        default:"no-pic.jpg",
        type:String,
      }

 }  );


 module.exports = mongoose.model("Products" , ProductsModel);