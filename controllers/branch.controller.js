const { branchService } = require("../services");

/* Add Branch */
const addBranch = async (req, res) => {
  try {
    const { name, city, address, contactNumber, email } = req.body;


    // Create new branch
    const newBranch = { name, city, address, contactNumber, email };
    const branch = await branchService.addBranch(newBranch);

    return res.status(201).json({ success: true, message: "Branch added successfully", branch });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

/* Get All Branches */
const getAllBranches = async (req, res) => {
    try {
      const branches = await branchService.getAllBranches();
      return res.status(200).json({
        success: true,
        message: "Branches fetched successfully",
        branches,
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  };
  

/* Get Branch by ID or City */
const getBranchByIdOrCity = async (req, res) => {
  try {
    const { search } = req.params;

    const branch = await branchService.getBranchByIdOrCity(search);
    if (!branch) {
      return res.status(404).json({ success: false, message: "Branch not found" });
    }

    return res.status(200).json({ success: true, branch });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* Update Branch */
const updateBranch = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedBranch = await branchService.updateBranch(id, updateData);
    if (!updatedBranch) {
      return res.status(404).json({ success: false, message: "Branch not found" });
    }

    return res.status(200).json({ success: true, message: "Branch updated successfully", branch: updatedBranch });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/* Delete Branch */
const deleteBranch = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBranch = await branchService.deleteBranch(id);
    if (!deletedBranch) {
      return res.status(404).json({ success: false, message: "Branch not found" });
    }

    return res.status(200).json({ success: true, message: "Branch deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  addBranch,
  getAllBranches,
  getBranchByIdOrCity,
  updateBranch,
  deleteBranch,
};
