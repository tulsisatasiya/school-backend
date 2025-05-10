const StudentProfile = require('../models/StudentProfile.model');
const Branch = require('../models/Branch.model');
const mongoose = require('mongoose');

// ✅ Create Student Profile
const createStudentProfile = async (data) => {
  try {
    const profile = new StudentProfile(data);
    return await profile.save();
  } catch (error) {
    console.error("Error creating student profile:", error.message);
    throw new Error("Failed to create student profile");
  }
};

// ✅ Get All Student Profiles (for admin/subadmin)
const getAllStudentProfiles = async () => {
  try {
    return await StudentProfile.find().populate('user class branch');
  } catch (error) {
    console.error("Error fetching student profiles:", error.message);
    throw new Error("Failed to fetch student profiles");
  }
};

// ✅ Get Student Profile by ID
const getStudentProfileById = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid student profile ID");
    }
    return await StudentProfile.findById(id).populate('user class branch');
  } catch (error) {
    console.error("Error fetching student profile:", error.message);
    throw new Error("Failed to fetch student profile");
  }
};

// ✅ Get Student Profile by User ID (for student self-profile)
const getProfileByUserId = async (userId) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid user ID");
    }
    return await StudentProfile.findOne({ user: userId }).populate('user class branch');
  } catch (error) {
    console.error("Error fetching profile by user ID:", error.message);
    throw new Error("Failed to fetch profile by user ID");
  }
};

// ✅ Update Student Profile by ID
const updateStudentProfile = async (id, data) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid student profile ID");
    }
    return await StudentProfile.findByIdAndUpdate(id, data, { new: true }).populate('user class branch');
  } catch (error) {
    console.error("Error updating student profile:", error.message);
    throw new Error("Failed to update student profile");
  }
};

// ✅ Delete Student Profile by ID
const deleteStudentProfile = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid student profile ID");
    }
    return await StudentProfile.findByIdAndDelete(id);
  } catch (error) {
    console.error("Error deleting student profile:", error.message);
    throw new Error("Failed to delete student profile");
  }
};

module.exports = {
  createStudentProfile,
  getAllStudentProfiles,
  getStudentProfileById,
  getProfileByUserId,
  updateStudentProfile,
  deleteStudentProfile
};
