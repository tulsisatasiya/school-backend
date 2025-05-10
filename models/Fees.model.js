const mongoose = require('mongoose');

const feesSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'StudentProfile' },
  amount: Number,
  status: { type: String, enum: ['Paid', 'Pending'], default: 'Pending' },
  dueDate: Date,
  paidDate: Date,
  branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' }
}, { timestamps: true });

module.exports = mongoose.model('Fees', feesSchema);
