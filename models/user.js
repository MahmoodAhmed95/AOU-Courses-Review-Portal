const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: String,
    profile_img: String,
    cloudinary_id: String,
    googleId: {
      type: String,
      required: true,
    },
    email: String,
    avatar: String,
    role: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
