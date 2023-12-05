const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const suggestionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
  },
  majorId: {
    type: Schema.Types.ObjectId,
    ref: "major",
    required: true,
  },
  cost: {
    type: String,
    default: "Not specified",
  },
  startDate: {
    type: Date,
    default: Date.now(),
  },
  endDate: {
    type: Date,
    default: Date.now(),
  },
  timeDuration: {
    type: String,
    default: "Not specified",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  cityId: {
    type: Schema.Types.String,
    ref: "city",
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  profile_img: String,
  cloudinary_id: String,
},
{
  timestamps: true,
});

module.exports = mongoose.model("Suggestion", suggestionSchema);
