const Major = require("../models/major");
const Suggestion = require("../models/suggestion");
const Course = require("../models/course");
const Branch = require("../models/branch");
const User = require("../models/user");

const cloudinary = require("../utils/cloudinary");

module.exports = {
  index,
  updateMajorForm,
  deleteMajor,
  createMajor,
  majorIndex,
  coursesIndex,
  courseForm,
  createCourse,
  updateCourseForm,
  deleteCourse,
  majorAjax,
  courseSuggestAjax,
  courseAjax,
  suggestionsIndex,
  suggestionsDetails,
  suggestionAccept,
  suggestionReject,
  usersIndex,
  userPromote,
  userDemote,
  userBlock,
};

// =========================================================================================
// =========================================================================================

// Start "Dashboard" Controls

function index(req, res) {
  res.render("admins/dashboard", { title: "Dashboard" });
}

// End Of "Dashboard" Controls

// =========================================================================================
// =========================================================================================

// Start "Majors" Controls

async function majorIndex(req, res) {
  const major = await Major.find({});
  res.render("admins/majors", {
    title: "Majors",
    major,
    errorMessages: req.flash("Error"),
    successMessages: req.flash("success"),
  });
}

async function createMajor(req, res) {
  try {
    //Regular Expression that will change the major to lower case
    // and then search on it bu using "i"  a case insensitive search
    const majorName = await Major.findOne({
      name: { $regex: new RegExp("^" + req.body.name.toLowerCase(), "i") },
    });
    //if major name already available
    if (majorName) {
      // console.log("Name already exist");
      req.flash("Error", `Major Name Already Exist!`);
      res.redirect("/admins/majors");
    } else {
      // if major name is null -> save it
      await Major.create({
        name: req.body.name,
        icon: req.body.icon,
      });
      req.flash("success", `Major Created successfully!`);
      res.redirect("/admins/majors");
    }
  } catch (error) {
    res.render("error");
  }
}

async function updateMajorForm(req, res) {
  console.log(req.body);
  const major = await Major.findById(req.params.id);
  major.name = req.body.name;
  major.icon = req.body.icon;
  try {
    await major.save();
    req.flash("success", `Major Updated successfully!`);
    res.redirect("/admins/majors");
  } catch (error) {
    res.render("error");
  }
}

//deleting the major
async function deleteMajor(req, res) {
  try {
    await Major.deleteOne({ _id: req.params.id });
    req.flash("success", `Major Deleted successfully!`);
    res.redirect("/admins/majors");
  } catch (error) {
    res.render("error");
  }
}

async function majorAjax(req, res) {
  const major = await Major.findById(req.params.id);
  res.json(major);
}
// End of "Majors" Controls

// =========================================================================================
// =========================================================================================

// Start "Courses" Controls

async function coursesIndex(req, res) {
  try {
    const majors = await Major.find({});
    const courses = await Course.find({});
    const suggestions = await Suggestion.find({});
    const branchs = await Branch.find({});
    res.render("admins/courses", {
      title: "Courses",
      courses: courses,
      majors: majors,
      suggestions: suggestions,
      branchs: branchs,
      errorMessages: req.flash("Error"),
      successMessages: req.flash("success"),
    });
  } catch (error) {
    res.render("error");
  }
}
async function courseForm(req, res) {
  const course = new Course();
  const majors = await Major.find({});
  res.render("admins/courses", { course, majors });
}

async function createCourse(req, res) {
  console.log(req.body);
  try {
    // const contactRegex = /^(3)\d{7}$|(17|80|66|69)\d{6}$/;
    // const contact = req.body.contact;
    const coursePrerequisite = req.body.coursePrerequisite;

    //Validate Course name
    const courseNameRegex = /^(?=(.*[a-zA-Z]){3})[a-zA-Z0-9\s]+$/;
    const courseName = req.body.name;

    //Validate Cost
    const courseCostRegex = /^\d{1,7}(\.\d{1,2})?$/;
    const courseCost = req.body.cost;

    if (!courseNameRegex.test(courseName)) {
      console.log("Invalid Course Name");
      req.flash("Error", `Invalid Course Name`);
      res.redirect("/admins/courses");
    } else if (!courseCostRegex.test(courseCost) && courseCost == !null) {
      console.log("Invalid Course Cost");
      req.flash("Error", `Invalid Cost`);
      res.redirect("/admins/courses");
    } else {
      if (req.body.imageChangeControl == "old") {
        req.body.profile_img = req.body.oldImageProfile;
        req.body.cloudinary_id = req.body.oldImage;
      } else {
        // Upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);
        req.body.profile_img = result.secure_url;
        req.body.cloudinary_id = result.public_id;
      }
      if (req.body.docChangeControl == "old") {
        req.body.material_doc = req.body.oldCourseDoc;
        req.body.cloudinary_id = req.body.oldDoc;
      } else {
        // Upload Doc to cloudinary
        const resultD = await cloudinary.uploader.upload(req.file.path);
        req.body.course_doc = resultD.secure_url;
        req.body.cloudinary_id = resultD.public_id;
      }
      delete req.body.suggestName;
      delete req.body.imageChangeControl;
      delete req.body.docChangeControl;
      delete req.body.oldImage;
      delete req.body.oldDoc;
      delete req.body.oldImageProfile;
      delete req.body.oldCourseDoc;
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      req.body.profile_img = result.secure_url;
      req.body.cloudinary_id = result.public_id;
      // Upload Doc to cloudinary
      const resultD = await cloudinary.uploader.upload(req.file.path);
      req.body.material_doc = resultD.secure_url;
      req.body.cloudinary_id = resultD.public_id;

      await Course.create(req.body);
      req.flash("success", `Courses Created Successfully!`);
      res.redirect("/admins/courses");
    }
  } catch (error) {
    console.log(error);
    res.render("error", { errorMsg: error.message });
  }
}
async function showOne(req, res) {
  const course = await Course.findById(req.params.id);
  // console.log(course);
  res.render("admins/courses/details", { title: "course", course });
}

async function editCourseForm(req, res) {
  const course = await Course.findById(req.params.id);
  const majors = await Major.find({});

  res.render("admins/courses/edit", {
    course,
    majors,
    // editMajor: Major.getOne(req.params.edit_id),
    title: "Edit Form",
  });
}

async function updateCourseForm(req, res) {
  try {
    const coursePrerequisite = req.body.coursePrerequisite;

    //Validate Course name
    const courseNameRegex = /^(?=(.*[a-zA-Z]){3})[a-zA-Z0-9\s]+$/;
    const courseName = req.body.name;

    //Validate Cost
    const courseCostRegex = /^\d{1,7}(\.\d{1,2})?$/;
    const courseCost = req.body.cost;

    if (!courseNameRegex.test(courseName)) {
      console.log("Invalid Course Name");
      req.flash("Error", `Invalid Course Name`);
      res.redirect("/admins/courses");
    } else if (!courseCostRegex.test(courseCost) && courseCost == !null) {
      console.log("Invalid Course Cost");
      req.flash("Error", `Invalid Cost`);
      res.redirect("/admins/courses");
    } else {
      const course = await Course.findById(req.params.id);
      if (req.body.imageChangeControl == "old") {
        req.body.profile_img = req.body.oldImageProfile;
        req.body.cloudinary_id = req.body.oldImage;
      } else {
        // Upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);
        req.body.profile_img = result.secure_url;
        req.body.cloudinary_id = result.public_id;
      }
      if (req.body.docChangeControl == "old") {
        req.body.material_doc = req.body.oldCourseDoc;
        req.body.cloudinary_id = req.body.oldDoc;
      } else {
        // Upload Doc to cloudinary
        const resultD = await cloudinary.uploader.upload(req.file.path);
        req.body.material_doc = resultD.secure_url;
        req.body.cloudinary_id = resultD.public_id;
      }
      console.log(req.body);
      course.name = req.body.name;
      (course.description = req.body.description),
        (course.coursePrerequisite = req.body.coursePrerequisite),
        (course.picture = req.body.picture),
        (course.material_doc = req.body.material_doc),
        // (course.contact = req.body.contact),
        (course.cost = req.body.cost),
        (course.majorId = req.body.majorId),
        (course.branchId = req.body.branchId),
        // (course.startDate = req.body.startDate),
        // (course.endDate = req.body.endDate),
        (course.timeDuration = req.body.timeDuration);
      await course.save();
      req.flash("success", `Courses Updated Successfully!`);
      res.redirect("/admins/courses");
    }
  } catch (error) {
    res.render("error");
  }
}

//deleting the course
async function deleteCourse(req, res) {
  try {
    await Course.deleteOne({ _id: req.params.id });
    res.redirect("/admins/courses");
  } catch (error) {
    res.render("error");
  }
}

async function courseAjax(req, res) {
  const course = await Course.findById(req.params.id);
  res.json(course);
}

async function courseSuggestAjax(req, res) {
  const suggestion = await Suggestion.findById(req.params.id);
  res.json(suggestion);
}
// End of "Courses" Controls

// =========================================================================================
// =========================================================================================

// Start"Suggetions" Controls

async function suggestionsIndex(req, res) {
  try {
    const suggestions = await Suggestion.find({});
    const users = await User.find({});
    console.log(suggestions);
    res.render("admins/suggestions", {
      title: "Suggestions",
      suggestions: suggestions,
      users: users,
      errorMessages: req.flash("Error"),
      successMessages: req.flash("success"),
    });
  } catch (error) {
    res.render("error");
  }
}
//Suggestion details
async function suggestionsDetails(req, res) {
  try {
    const suggest = await Suggestion.findById(req.params.id);
    res.render("admins/details", {
      title: "Details",
      suggest: suggest,
    });
  } catch (error) {
    res.render("error");
  }
}

async function suggestionAccept(req, res) {
  try {
    const suggest = await Suggestion.findById(req.params.id);
    suggest.status = true;
    await suggest.save();
    req.flash("success", `Suggest Accept successfully!`);
    res.redirect("/admins/suggestions");
  } catch (error) {
    res.render("error");
  }
}

async function suggestionReject(req, res) {
  try {
    await Suggestion.deleteOne({ _id: req.params.id });
    req.flash("success", `Suggestion Rejected successfully!`);
    res.redirect("/admins/suggestions");
  } catch (error) {
    res.render("error");
  }
}

// End of "Suggetions" Controls

// =========================================================================================
// =========================================================================================

// Start"Users" Controls

async function usersIndex(req, res) {
  try {
    const users = await User.find({});
    res.render("admins/users", {
      title: "Users",
      users: users,
      errorMessages: req.flash("Error"),
      successMessages: req.flash("success"),
    });
  } catch (error) {
    res.render("error");
  }
}
async function userPromote(req, res) {
  try {
    const user = await User.findById(req.params.id);
    user.role = 1;
    await user.save();
    req.flash("success", `User Promoted successfully!`);
    res.redirect("/admins/users");
  } catch (error) {
    res.render("error");
  }
}

async function userDemote(req, res) {
  try {
    const user = await User.findById(req.params.id);
    user.role = 0;
    await user.save();
    req.flash("success", `User Demoted successfully!`);
    res.redirect("/admins/users");
  } catch (error) {
    res.render("error");
  }
}

async function userBlock(req, res) {
  try {
    const user = await User.findById(req.params.id);
    user.role = 9;
    await user.save();
    req.flash("success", `User Blocked successfully!`);
    res.redirect("/admins/users");
  } catch (error) {
    res.render("error");
  }
}
// End of "User" Controls
