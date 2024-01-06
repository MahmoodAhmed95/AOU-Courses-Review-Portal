const Course = require("../models/course");
const Major = require("../models/major");
const Branch = require("../models/branch");

const cloudinary = require("../utils/cloudinary");
module.exports = {
  index,
  courseForm,
  create,
  showOne,
  editCourseForm,
  updateCourseForm,
  deleteCourse,
};

async function index(req, res) {
  const courses = await Course.find({});
  const majors = await Major.find({});
  const cities = await Branch.find({});
  console.log(majors);
  res.render("courses/index", { title: "Courses", courses, cities, majors });
}

async function index(req, res) {
  try {
    const majors = await Major.find({});
    const cities = await Branch.find({});
    const courses = await Course.find({});
    res.render("courses/index", {
      title: "course",
      courses: courses,
      cities: cities,
      majors: majors,
    });
  } catch (error) {
    res.render("error");
  }
}

async function courseForm(req, res) {
  const course = new Course();
  const majors = await Major.find({});
  const cities = await Branch.find({});
  res.render("courses/new", { course, majors, cities });
}

async function create(req, res) {
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    req.body.profile_img = result.secure_url;
    req.body.cloudinary_id = result.public_id;
    const course = await Course.findOne({ name: req.body.name });
    console.log(course);
    if (course) {
      console.log("Name already exist");
    } else {
      await Course.create(req.body);
      res.redirect("/courses/");
    }
  } catch (error) {
    console.log(error);
    res.render("error", { errorMsg: error.message });
  }
}
async function showOne(req, res) {
  const course = await Course.findById(req.params.id);
  const majors = await Major.find({});
  res.render("courses/details", {
    title: "course",
    course,
    majors,
    errorMessages: req.flash("Error"),
    successMessages: req.flash("success"),
  });
}

async function editCourseForm(req, res) {
  const course = await Course.findById(req.params.id);
  const majors = await Major.find({});

  res.render("courses/edit", {
    course,
    majors,
    title: "Edit Form",
  });
}

async function updateCourseForm(req, res) {
  const course = await Course.findById(req.params.id);
  course.name = req.body.name;
  (course.description = req.body.description),
    (course.location = req.body.location),
    (course.picture = req.body.picture),
    (course.contact = req.body.contact),
    (course.cost = req.body.cost),
    (course.startDate = req.body.startDate),
    (course.endDate = req.body.endDate),
    (course.timeDuration = req.body.timeDuration);
  try {
    await course.save();
    res.redirect("/");
  } catch (error) {
    res.render("error");
  }
}

//deleting the course
async function deleteCourse(req, res) {
  try {
    await Course.deleteOne({ _id: req.params.id });
    res.redirect("/");
  } catch (error) {
    res.render("error");
  }
}
