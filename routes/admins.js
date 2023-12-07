var express = require("express");
var router = express.Router();
const upload = require("../utils/multer");

const adminsCtrl = require("../controllers/admins");

// =========================================================================================
// =========================================================================================

// Start "Dashboard" Routes

// Get "Dashboard" Page
router.get("/", adminsCtrl.index);

// End "Dashboard" Routes

// =========================================================================================
// =========================================================================================

// Start "Categories" Routes

// Get "Categories Control" Page
router.get("/majors", adminsCtrl.majorIndex);

// get majors by Ajax
router.get("/majors/ajaxMajor/:id", adminsCtrl.majorAjax);
//Creating major Route
router.post("/majors", adminsCtrl.createMajor);

//Updating the major data -> database
router.put("/majors/update/:id", adminsCtrl.updateMajorForm);

//deleting the major
router.delete("/majors/delete/:id", adminsCtrl.deleteMajor);

// End of "Categories" Routes

// =========================================================================================
// =========================================================================================

// Start "Courses" Routes

//New Course Route to display the form
router.get("/courses", adminsCtrl.coursesIndex);

//Creating course Route
router.post("/courses", upload.single("image"), adminsCtrl.createCourse);

//get Suggestes by Ajax
router.get("/courses/ajaxSuggest/:id", adminsCtrl.courseSuggestAjax);

//get Courses by Ajax
router.get("/courses/ajaxCourse/:id", adminsCtrl.courseAjax);

//Updating  course data -> database
router.put(
  "/courses/update/:id",
  upload.single("image"),
  adminsCtrl.updateCourseForm
);

//deleting the course
router.delete("/courses/delete/:id", adminsCtrl.deleteCourse);

// End of "Courses" Routes

// =========================================================================================
// =========================================================================================

// Start "Suggestions" Routes

//New Course Route to display the form
router.get("/suggestions", adminsCtrl.suggestionsIndex);

//New Course Route to display the form
router.get("/suggestions/:id", adminsCtrl.suggestionsDetails);

//New Course Route to display the form
router.get("/suggestions/accept/:id", adminsCtrl.suggestionAccept);
//New Course Route to display the form
router.get("/suggestions/reject/:id", adminsCtrl.suggestionReject);

// End of "Suggestions" Routes

// =========================================================================================
// =========================================================================================

// Start "Users" Routes

// to display users table
router.get("/users", adminsCtrl.usersIndex);

// to display users table
router.get("/users/promote/:id", adminsCtrl.userPromote);

// to display users table
router.get("/users/demote/:id", adminsCtrl.userDemote);

// to display users table
router.get("/users/block/:id", adminsCtrl.userBlock);

// End of "Users" Routes

module.exports = router;
