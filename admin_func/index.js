const express  = require("express");
const connectToDB = require("./utils/connectToDB");
const homeRouter = require("./Routes/homeRoutes");
const userRoutes = require("./Routes/userRoutes");
const errorware = require("./middlewares/errorware");


const app = express();

app.use(express.json());
connectToDB();


app.use("/" ,homeRouter);
app.use("/users" , userRoutes);

app.use(errorware);
app.listen( 80 , () =>{
    console.log("SERVER ----------  APP RUNNING ON PORT 80");
 } )



