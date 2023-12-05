const Major = require("../models/major");
const Course = require("../models/course");
module.exports = {
  index,
  create,
  majorForm,
  showMajorCourses,
  editMajorForm,
  updateMajorForm,
  deleteMajor,
};

async function index(req, res) {
  try {
    const majors = await Major.find({});
    res.render("majors/index", {
      title: "major",
      majors: majors,
    });
  } catch (error) {
    res.render("error");
  }
}

function majorForm(req, res) {
  const major = new Major();
  res.render("majors/new", { major });
}

async function create(req, res) {
  const major = new Major({
    name: req.body.name,
  });
  try {
    const majorName = await Major.findOne({ name: req.body.name });
    if (majorName) {
      console.log("Name already exist");
    } else {
      await major.save();
      res.redirect("majors");
    }
  } catch (error) {
    res.render("error");
  }
}

async function showMajorCourses(req, res) {
  const majors = await Major.find({});
  const major = await Major.findById(req.params.id);
  const courses = await Course.find({}).where("majorId").equals(req.params.id);
  res.render("courses/index", {
    title: major.name,
    courses: courses,
    majors,
  });
}

async function editMajorForm(req, res) {
  const major = await Major.findById(req.params.id);
  res.render("majors/edit", {
    major,
    title: "Edit Form",
  });
}

async function updateMajorForm(req, res) {
  const major = await Major.findById(req.params.id);
  major.name = req.body.name;
  try {
    await major.save();
    res.redirect("/majors");
  } catch (error) {
    res.render("error");
  }
}

//deleting the major
async function deleteMajor(req, res) {
  try {
    await Major.deleteOne({ _id: req.params.id });
    res.redirect("/");
  } catch (error) {
    res.render("error");
  }
}