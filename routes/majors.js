var express = require("express");
var router = express.Router();

const majorsCtrl = require("../controllers/majors");

/* GET home page. */
router.get("/", majorsCtrl.index);

//New Category Route to display the form
router.get("/:id", majorsCtrl.showMajorCourses);

module.exports = router;
