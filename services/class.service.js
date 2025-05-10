const ClassModel = require("../models/Class.model");

// 🔹 Create a new class
const addClass = async (classData) => {
  try {
    const newClass = new ClassModel(classData);
    return await newClass.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

// 🔹 Get all classes
const getAllClasses = async () => {
  return await ClassModel.find().populate('branch');
};

// 🔹 Get class by ID
const getClassById = async (id) => {
  return await ClassModel.findById(id).populate('branch');
};

// 🔹 Update class
const updateClass = async (id, updateData) => {
  return await ClassModel.findByIdAndUpdate(id, updateData, { new: true });
};

// 🔹 Delete class
const deleteClass = async (id) => {
  return await ClassModel.findByIdAndDelete(id);
};

module.exports = {
  addClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass,
};
