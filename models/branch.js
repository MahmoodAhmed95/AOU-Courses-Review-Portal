const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const branchSchema = new Schema(
  {
    name: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Branch", branchSchema);
