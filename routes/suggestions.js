var express = require("express");
var router = express.Router();
const upload = require("../utils/multer");

const suggestionsCtrl = require("../controllers/suggestions");


//New suggestion Route to display the form
router.get("/", suggestionsCtrl.index);

//Creating suggestion Route
router.post("/create", upload.single("image"), suggestionsCtrl.create);

module.exports = router;
