const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: String,
  code: String,
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' }
}, { timestamps: true });

module.exports = mongoose.model('Subject', subjectSchema);
