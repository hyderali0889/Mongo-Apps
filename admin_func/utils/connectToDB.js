const Mongoose = require("mongoose");


const connectToDB  = async() =>{


    const mongoose = await Mongoose.connect("mongodb+srv://hyderali3226:adminFunc0889@adminfunc.wlnhw1e.mongodb.net/test")

    console.log(`MONGO  ----------------- CONNECTED TO DB`);
 }


 module.exports = connectToDB;