const Mongoose = require("mongoose");


const connectToDB  = async() =>{


    const mongoose = await Mongoose.connect("")

    console.log(`MONGO  ----------------- CONNECTED TO DB`);
 }


 module.exports = connectToDB;
