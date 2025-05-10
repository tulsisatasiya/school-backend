const mongoose = require('mongoose');

const studentProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  rollNumber: { type: String }, 
  enrollmentNumber: { type: String, unique: true }, // Auto: ENROLL001
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
  branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' },

  //  Additional Student Details
  dob: { type: Date },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  bloodGroup: { type: String },
  phone: { type: String },
  parentName: { type: String },
  address: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String
  },
  emergencyContact: {
    name: String,
    relation: String,
    phone: String
  },
  admissionDate: { type: Date },
  profileImage: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('StudentProfile', studentProfileSchema);
