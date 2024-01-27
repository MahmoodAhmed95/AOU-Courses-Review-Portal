const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const suggestionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    coursePrerequisite: {
      // new
      type: String,
    },
    branchId: {
      type: Schema.Types.ObjectId,
      ref: "branch",
      required: true,
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
    timeDuration: {
      type: String,
      default: "Not specified",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    branchId: {
      type: Schema.Types.String,
      ref: "branch",
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
    profile_img: String,
    cloudinary_id: String,
    material_doc: String, // new
    cloudinary_id: String, // new
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Suggestion", suggestionSchema);
