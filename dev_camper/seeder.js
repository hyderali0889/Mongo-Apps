const BootcampModel = require("./models/BootcampModel");
const Mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const color = require("colors");
const CoursesModel = require("./models/CoursesModels");
const UserModel = require("./models/UserModels");


dotenv.config({ path: "./config/config.env" });

Mongoose.set("strictQuery", true);
Mongoose.connect(process.env.MONGO_URI);

const bootcamp = JSON.parse(
  fs.readFileSync(`${__dirname}/resources/_data/bootcamps.json`, "utf-8")
);
const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/resources/_data/courses.json`, "utf-8")
);
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/resources/_data/users.json`, "utf-8")
);

const importData = async () => {
  try {
    await BootcampModel.create(bootcamp);
    await CoursesModel.create(courses);
    await UserModel.create(users);
    console.log("Data Imported".green.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};
const deleteData = async () => {
  try {
    await BootcampModel.deleteMany();
    await CoursesModel.deleteMany();
    await UserModel.deleteMany();
    console.log("Data Deleted".red.inverse);

    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
