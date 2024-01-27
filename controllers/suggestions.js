const Suggestion = require("../models/suggestion");
const Major = require("../models/major");
const Branch = require("../models/branch");

const cloudinary = require("../utils/cloudinary");

module.exports = {
  index,
  create,
};

async function index(req, res) {
  const majors = await Major.find({});
  const branchs = await Branch.find({});
  res.render("suggestions/index", {
    title: "Suggest",
    branchs,
    majors,
    errorMessages: req.flash("Error"),
    successMessages: req.flash("success"),
  });
}

async function create(req, res) {
  try {
    //Validate Cost
    const courseCostRegex = /^\d{1,7}(\.\d{1,2})?$/;
    const courseCost = req.body.cost;

    if (!courseCostRegex.test(courseCost) && courseCost == !null) {
      req.flash("Error", `Invalid Cost`);
      res.redirect("/suggestions/");
    } else {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      req.body.profile_img = result.secure_url;
      req.body.cloudinary_id = result.public_id;
      req.body.user = req.user._id;

      await Suggestion.create(req.body);
      req.flash("success", `Suggest Added successfully!`);
      res.redirect("/suggestions/");
    }
  } catch (error) {
    req.flash("Error", `Failed Suggest!`);
    res.redirect("/suggestions/");
  }
}
