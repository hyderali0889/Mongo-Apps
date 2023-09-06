const Mongoose = require("mongoose");
const colors = require("colors");

const ConnectToDB = async () => {
  try {

 

    await Mongoose.connect( url , {

          
    }
    );
    console.log("Connected To Database".red.underline);
  } catch (error) {
    console.log(error);
  }
};

module.exports = ConnectToDB;
