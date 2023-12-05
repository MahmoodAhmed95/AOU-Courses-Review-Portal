const Course = require("../models/course");
const Major = require("../models/major");
const Branch = require("../models/branch");

// const cloudinary = require("../utils/cloudinary");
module.exports = {
  index,
  getBranch,
};

// function to show all in the home page
async function index(req, res) {
  const courses = await Course.find({});
  const categories = await Major.find({});
  const cities = await Branch.find({});

  res.render("index", { courses, categories, cities });
}

// new function to get the branch by the selected drag drop
async function getBranch(req, res) {
  const courses = await Course.find({ branchId: req.params.id });
  console.log(courses);
  res.json(courses);
}
