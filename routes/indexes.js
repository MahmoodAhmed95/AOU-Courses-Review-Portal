var express = require("express");
var router = express.Router();
const indexsCtrl = require("../controllers/indexes");
// routes/index.js
// new Passport step 9 week6 day 4 root toute
const passport = require("passport");
//
// Google OAuth login route
router.get(
  "/auth/google",
  passport.authenticate(
    // Which passport strategy is being used?
    "google",
    {
      // Requesting the user's profile and email
      scope: ["profile", "email"],
      // Optionally force pick account every time
      // prompt: "select_account"
    }
  )
);
// Google OAuth callback route
router.get(
  "/oauth2callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);
router.get("/", indexsCtrl.index);
// OAuth logout route
router.get("/logout", function (req, res) {
  req.logout(function () {
    res.redirect("/");
  });
});

router.get("/about", function (req, res, next) {
  res.render("about", { title: "About Us" });
});

// route to get the selected from the drag drop by ajax
router.get("/branchValue/:id", indexsCtrl.getBranch);
module.exports = router;
