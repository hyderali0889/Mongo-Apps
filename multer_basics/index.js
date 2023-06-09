const express = require("express");
const path = require("path");
const router = require("./routes/main_route");


const app = express();

app.use(express.static(path.join(__dirname, "uploads")));

app.use("/", router );


app.listen( 80 , () =>{
    console.log(`SERVER %%%%%%%%%%%%%%%%%%%%% Running on Port 80 `);
 } )