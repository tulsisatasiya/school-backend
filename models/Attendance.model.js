const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
  students: [{
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'StudentProfile' },
    status: { type: String, enum: ['Present', 'Absent', 'Leave'], default: 'Present' }
  }],
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' }
}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
