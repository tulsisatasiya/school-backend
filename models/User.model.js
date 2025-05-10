const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String },
  password: String,
  phone: { type: String, unique: true, required: true },
  role: { 
    type: String, 
    enum: ['admin', 'sub-admin', 'teacher', 'student'], 
    required: true 
  },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
    required: function () {
      return this.role !== 'admin'; 
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
