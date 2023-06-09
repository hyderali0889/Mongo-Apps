const errorware = (  err, req,res,next) =>{

    res.status(400).json( {
        success:false,
        message:err.message
     } )
 }

 module.exports = errorware;