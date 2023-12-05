var express = require("express");
var router = express.Router();
const upload = require("../utils/multer");

const eventsCtrl = require("../controllers/courses");
const reviewsCtrl = require("../controllers/reviews");
const categoriesCtrl = require("../controllers/majors");

/* GET home page. */
router.get("/", coursesCtrl.index);

// reviews add for the reviews section
router.post("/:id/reviews", reviewsCtrl.create);

// router.get("/:id", coursesCtrl.showCategoryButton);
router.delete("/:id/deletereview", reviewsCtrl.delete);

//Creating course Route
router.get("/:id", eventsCtrl.showOne);


module.exports = router;
