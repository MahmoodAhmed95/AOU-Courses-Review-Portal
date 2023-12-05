const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const majorSchema = new Schema({
  name: String,
  icon: String,
},
{
  timestamps: true,
});

module.exports = mongoose.model("Major", majorSchema);
