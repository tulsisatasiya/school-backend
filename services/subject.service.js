const Subject = require('../models/Subject.model');
const mongoose = require('mongoose');

// ✅ Create Subject
const createSubject = async (data) => {
  return await Subject.create(data);
};

// ✅ Get All Subjects
const getAllSubjects = async () => {
  return await Subject.find().populate('class teacher branch');
};

// ✅ Get Subject by ID
const getSubjectById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid subject ID");
  }
  return await Subject.findById(id).populate('class teacher branch');
};

// ✅ Update Subject
const updateSubject = async (id, data) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid subject ID");
  }
  return await Subject.findByIdAndUpdate(id, data, { new: true }).populate('class teacher branch');
};

// ✅ Delete Subject
const deleteSubject = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid subject ID");
  }
  return await Subject.findByIdAndDelete(id);
};

module.exports = {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
};
