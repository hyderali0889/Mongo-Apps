const express = require("express");
const colors = require("colors");
const ProductsRouter = require("./Routes/ProductsRoute");
const errorware = require("./Middleware/errorware");
const ConnectToDB = require("./utils/ConnectToDb");
const busboy = require("express-busboy");
const path = require("path");

ConnectToDB();
const app = express();

app.use(express.static(path.join(__dirname , "uploads") ));


busboy.extend(app, {
  path: './uploads',
  upload: true,
  allowedPath: /./
});

app.use( "/products/api/v1" ,ProductsRouter);

app.use(errorware);


app.listen(8000, () => {
  console.log("Server started at port 8000".underline.cyan);
});


process.on("unhandledRejection", (err, promise) => {
    console.log(err.message.red.underline);
    server.close(() => process.exit(1));
  });