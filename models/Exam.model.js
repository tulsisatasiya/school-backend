const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  name: String,
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
  date: Date,
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
  branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' }
}, { timestamps: true });

module.exports = mongoose.model('Exam', examSchema);
