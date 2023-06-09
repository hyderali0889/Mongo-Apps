const express = require("express");
const dotenv = require("dotenv");
const errorware = require("./Middlewares/errorware");
const expressratelimitter = require("express-rate-limit");
const expressSanitize = require("express-mongo-sanitize");
const cors = require("cors");
const hpp = require("hpp");
const xss = require("xss-clean");
const helmet = require("helmet");
dotenv.config({ path: "./config/config.env" });
const path = require("path");
const db = require("./config/connectDb");
const userRoute = require("./routes/UserRoutes");
const adminRoute = require("./routes/adminRoutes");
const birthRoute = require("./routes/birthRoutes");
const deathRoute = require("./routes/deathRoutes");



db();

const app = express();
const router = express.Router();

app.use(express.json())


app.use(express.static(path.join(__dirname, "extras")));


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

app.use("/", router);
app.use("/User/", userRoute);

app.use("/admin/", adminRoute);
app.use("/birth/", birthRoute);
app.use("/death/", deathRoute);


const file = path.join(__dirname, "extras/404.html");

app.use("*", (req, res, next) => {
  res.sendFile(file);
});

app.use(errorware);

const PORT = process.env.PORT || 80;
const server = app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);

process.on("unhandledRejection", (err, promise) => {
  console.log(err.message);
  server.close(() => process.exit(1));
});

