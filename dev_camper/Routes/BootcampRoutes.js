const express = require("express");
const router = express.Router();
const {
  getBootcamps,
  CreateBootcamp,
  DeleteBootcamp,
  UpdateBootcamp,
  getBootcamp,
  UploadPhoto,
} = require("../controllers/BootcampController");
const { getAllCourses } = require("../controllers/CourseController");
const AdvancedResults = require("../Middlewares/advancedResults");
const { protectRoute, authorizeByRole } = require("../Middlewares/Protection");
const BootcampModels = require("../models/BootcampModel");

router
  .route("/")
  .get(

    AdvancedResults(BootcampModels, {
      path: "courses user",
      select: "name description",
    }),
    getBootcamps
  )
  .post(protectRoute, authorizeByRole("publisher", "admin"), CreateBootcamp);
router
  .route("/:id")
  .get(getBootcamp)
  .put(protectRoute, authorizeByRole("publisher", "admin"), UpdateBootcamp)
  .delete(protectRoute, authorizeByRole("publisher", "admin"), DeleteBootcamp);
router.route("/:bootcampId/courses").get(getAllCourses);
router
  .route("/:bootcampId/photo")
  .put(protectRoute, authorizeByRole("publisher", "admin"), UploadPhoto);


  

module.exports = router;
