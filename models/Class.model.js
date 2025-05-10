const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., "10"
  section: { type: String },              // e.g., "A"
  branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' }
}, { timestamps: true });

module.exports = mongoose.model('Class', classSchema);
