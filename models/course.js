const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reviewSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 3,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userName: String,
    userAvatar: String,
  },
  {
    timestamps: true,
  }
);
const courseSchema = new Schema(
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
    majorId: {
      type: Schema.Types.ObjectId,
      ref: "major",
      required: true,
    },
    branchId: {
      type: Schema.Types.ObjectId,
      ref: "branch",
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
    profile_img: String,
    cloudinary_id: String,
    material_doc: String, // new
    cloudinary_id: String, // new
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Course", courseSchema);
