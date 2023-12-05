const Course = require("../models/course");

module.exports = {
  create,
  delete:deleteReview,
};

async function create(req, res) {
  const course = await Course.findById(req.params.id);

  // Add the user-centric info to req.body (the new review)
  req.body.user = req.user._id;
  req.body.userName = req.user.name;
  req.body.userAvatar = req.user.avatar;

  // We can push (or unshift) subdocs into Mongoose arrays
  course.reviews.push(req.body);
  try {
    await course.save();
  } catch (error) {
    req.flash("Error", `Failed to Add Review!`);
    res.redirect(`/courses/${course._id}`);
  }
  req.flash("success", `Review Added successfully!`);
  res.redirect(`/courses/${course._id}`);
}

//deleting the review

async function deleteReview(req, res) {
  // Note the cool "dot" syntax to query on the property of a subdoc
  const course = await Course.findOne({
    "reviews._id": req.params.id,
    "reviews.user": req.body.reviewUser,
  });
  // Rogue user!
  if (!course){
      req.flash("Error", `Failed to Delete Review!`);
      return res.redirect(`/courses/${course._id}`);
  }
  // Remove the review using the remove method available on Mongoose arrays
  course.reviews.remove(req.params.id);
  // Save the updated movie doc
  await course.save();
  // Redirect back to the movie's show view
  req.flash("success", `Review deleted successfully!`);
  res.redirect(`/courses/${course._id}`);
}
