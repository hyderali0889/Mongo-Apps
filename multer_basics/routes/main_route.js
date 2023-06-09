
const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

const configs = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,"./uploads");


     },
     filename : (req,file,cb)=>{

        cb(null,file);
     }
 });

 const uploads = multer( {
    storage:configs
  } ).single("image");

router.route("/").post( uploads,(req,res) =>{



    res.json({
        message: "Image Added Success"
    })
 } )

 module.exports = router;