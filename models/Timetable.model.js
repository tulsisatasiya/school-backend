const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
  day: { type: String }, // e.g., "Monday"
  periods: [{
    periodNumber: Number,
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  }],
  branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' }
}, { timestamps: true });

module.exports = mongoose.model('Timetable', timetableSchema);
