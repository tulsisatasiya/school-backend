const mongoose = require('mongoose');

const homeworkSchema = new mongoose.Schema({
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: String,
  dueDate: Date,
  files: [String],
  branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' }
}, { timestamps: true });

module.exports = mongoose.model('Homework', homeworkSchema);
