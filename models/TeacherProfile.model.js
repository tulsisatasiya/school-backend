const mongoose = require('mongoose');

const teacherProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true },
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' }, // e.g., "10A"
    name: { type: String, required: true }, // e.g., "John Doe"

  // ✅ Professional Info
  qualification: { type: String },             // e.g., B.Ed, M.Sc
  experience: { type: String },                // e.g., "5 years"
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }], // Subjects taught by the teacher
  // ✅ Personal Info
  dob: { type: Date },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  bloodGroup: { type: String },
  phone: { type: String },

  email: { type: String },

 

}, { timestamps: true });

module.exports = mongoose.model('TeacherProfile', teacherProfileSchema);
