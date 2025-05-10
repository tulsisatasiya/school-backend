const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam' },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'StudentProfile' },
  marksObtained: Number,
  totalMarks: Number,
  grade: String,
  branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' }
}, { timestamps: true });

module.exports = mongoose.model('Result', resultSchema);
