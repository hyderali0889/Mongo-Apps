const express = require("express");
const dotenv = require("dotenv");
const BootcampRoutes = require("./Routes/BootcampRoutes");
const CoursesRoutes = require("./Routes/CourseRoutes");
const AuthRoutes = require("./Routes/AuthRoutes");
const UserRoutes = require("./Routes/UserRoutes");
const logger = require("./Middlewares/loggerware");
const errorware = require("./Middlewares/errorware");
const busboy = require("express-busboy");
const expressratelimitter = require("express-rate-limit");
const expressSanitize = require("express-mongo-sanitize");
const cors = require("cors");
const hpp = require("hpp");
const xss = require("xss-clean");
const helmet = require("helmet");
dotenv.config({ path: "./config/config.env" });
const cookieParser = require("cookie-parser");
const path = require("path");
const mongoose  = require("mongoose");

const connectToDB = async(  ) => {
  mongoose.set( "strictQuery" , true );
  const db = await mongoose.connect("mongodb://HyderAli:Devcamp3226@ac-u3c4ryh-shard-00-00.7tgj5ag.mongodb.net:27017,ac-u3c4ryh-shard-00-01.7tgj5ag.mongodb.net:27017,ac-u3c4ryh-shard-00-02.7tgj5ag.mongodb.net:27017/DevCamper?replicaSet=atlas-bukv88-shard-0&ssl=true&authSource=admin");
  console.log(`CONNECTED TO DB ${db.connection.host}`);
}

connectToDB();

const app = express();
const router = express.Router();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "extras")));

busboy.extend(app, {
  path: "./public/uploads",
  upload: true,
  allowedPath: /./,
});

app.use(expressSanitize());
app.use(hpp());
app.use(cors());
app.use(xss());
app.use(helmet());

const limiter = expressratelimitter.rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
});

app.use(limiter);

app.use(logger);

router.route("/").get((req, res) => {
  res.redirect("https://documenter.getpostman.com/view/23982070/2s93RNwtyM");
});

app.use("/", router);
app.use("/data/v1/bootcamps/", BootcampRoutes);
app.use("/data/v1/courses/", CoursesRoutes);
app.use("/data/v1/auth/", AuthRoutes);
app.use("/data/v1/users/", UserRoutes);

const file = path.join(__dirname, "extras/404.html");

app.use("*", (req, res, next) => {
  res.sendFile(file);
});

app.use(errorware);
app.use(cookieParser);

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);

process.on("unhandledRejection", (err, promise) => {
  console.log(err.message);
  server.close(() => process.exit(1));
});

