const TeacherProfile = require('../models/TeacherProfile.model');
const mongoose = require('mongoose');

// ✅ Create Teacher Profile
const createTeacherProfile = async (data) => {
  try {
    const profile = new TeacherProfile(data);
    return await profile.save();
  } catch (error) {
    console.error("Error creating teacher profile:", error.message);
    throw new Error("Failed to create teacher profile");
  }
};

// ✅ Get All Teacher Profiles
const getAllTeacherProfiles = async () => {
  try {
    return await TeacherProfile.find().populate('user branch subjects');
  } catch (error) {
    console.error("Error fetching teacher profiles:", error.message);
    throw new Error("Failed to fetch teacher profiles");
  }
};

// ✅ Get Teacher Profile by ID
const getTeacherProfileById = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid teacher profile ID");
    }
    return await TeacherProfile.findById(id).populate('user branch subjects');
  } catch (error) {
    console.error("Error fetching teacher profile:", error.message);
    throw new Error("Failed to fetch teacher profile");
  }
};

// ✅ Get Teacher Profile by User ID
const getProfileByUserId = async (userId) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid user ID");
    }
    return await TeacherProfile.findOne({ user: userId }).populate('user branch subjects');
  } catch (error) {
    console.error("Error fetching profile by user ID:", error.message);
    throw new Error("Failed to fetch profile by user ID");
  }
};

// ✅ Update Teacher Profile by ID
const updateTeacherProfile = async (id, data) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid teacher profile ID");
    }
    return await TeacherProfile.findByIdAndUpdate(id, data, { new: true }).populate('user branch subjects');
  } catch (error) {
    console.error("Error updating teacher profile:", error.message);
    throw new Error("Failed to update teacher profile");
  }
};

// ✅ Delete Teacher Profile by ID
const deleteTeacherProfile = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid teacher profile ID");
    }
    return await TeacherProfile.findByIdAndDelete(id);
  } catch (error) {
    console.error("Error deleting teacher profile:", error.message);
    throw new Error("Failed to delete teacher profile");
  }
};

module.exports = {
  createTeacherProfile,
  getAllTeacherProfiles,
  getTeacherProfileById,
  getProfileByUserId,
  updateTeacherProfile,
  deleteTeacherProfile,
};
