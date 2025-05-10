const mongoose = require("mongoose");

const branchSchema = new mongoose.Schema({
//   name: { type: String, required: true },
name: { type: String, required: true, unique: true },
  city: { type: String, required: true },
  address: { type: String },
  contactNumber: { type: String },
  email: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Branch", branchSchema);
