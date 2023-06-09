const Mongoose = require("mongoose");
const colors = require("colors");

const ConnectToDB = async () => {
  try {

    let url = "mongodb://Hayder_Ali:Etrade123@ac-ijhhuer-shard-00-00.uvwjozr.mongodb.net:27017,ac-ijhhuer-shard-00-01.uvwjozr.mongodb.net:27017,ac-ijhhuer-shard-00-02.uvwjozr.mongodb.net:27017/ETrade?replicaSet=atlas-2d7iwq-shard-0&ssl=true&authSource=admin";

    await Mongoose.connect( url , {

          
    }
    );
    console.log("Connected To Database".red.underline);
  } catch (error) {
    console.log(error);
  }
};

module.exports = ConnectToDB;
