const mongoose = require('mongoose');

const connectToDb = async ( ) =>{
mongoose.set( "strictQuery" , true );
  const db = await mongoose.connect( process.env.MONGO_URI);

  console.log(`CONNECTED TO DB ${db.connection.host}`);
 }

 module.exports = connectToDb;