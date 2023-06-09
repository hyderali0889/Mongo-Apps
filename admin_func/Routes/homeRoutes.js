const express = require("express");
const ErrorResponse = require('../utils/ErrorResponse')

const router =express.Router();

router.route("/").get( (req,res,next) =>{
    try {
        res.status(200).json( {
            success:true,
            data:"YEAH STARTED"

         } )
    } catch (error) {
next( ErrorResponse("Error cannot load Home Page" , 400) )
    }

 } );

 module.exports = router;
