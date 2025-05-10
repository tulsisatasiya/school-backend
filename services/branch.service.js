const Branch = require("../models/Branch.model");
const mongoose = require("mongoose");

// ✅ Add New Branch
const addBranch = async (data) => {
  try {
    const branch = new Branch(data);
    return await branch.save();
  } catch (error) {
    console.error("Error adding branch:", error.message);
    throw new Error("Failed to add branch");
  }
};

// ✅ Get All Branches
const getAllBranches = async () => {
  try {
    return await Branch.find();
  } catch (error) {
    console.error("Error fetching branches:", error.message);
    throw new Error("Failed to fetch branches");
  }
};

// ✅ Get Branch by ID or City
const getBranchByIdOrCity = async (search) => {
  try {
    // If search is a valid ObjectId, try by _id first
    if (mongoose.Types.ObjectId.isValid(search)) {
      const branchById = await Branch.findById(search);
      if (branchById) return branchById;
    }

    // Otherwise, search by city (case-insensitive)
    const branchByCity = await Branch.findOne({
      city: { $regex: new RegExp(search, "i") },
    });

    return branchByCity;
  } catch (error) {
    console.error("Error finding branch:", error.message);
    throw new Error("Failed to get branch");
  }
};

// ✅ Update Branch
const updateBranch = async (id, data) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid branch ID");
    }

    return await Branch.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  } catch (error) {
    console.error("Error updating branch:", error.message);
    throw new Error("Failed to update branch");
  }
};

// ✅ Delete Branch
const deleteBranch = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid branch ID");
    }

    return await Branch.findByIdAndDelete(id);
  } catch (error) {
    console.error("Error deleting branch:", error.message);
    throw new Error("Failed to delete branch");
  }
};

module.exports = {
  addBranch,
  getAllBranches,
  getBranchByIdOrCity,
  updateBranch,
  deleteBranch,
};
