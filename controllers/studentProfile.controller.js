const { studentProfileService } = require("../services");

/* 🟢 Get My Profile (Student Only) */
const getMyProfile = async (req, res) => {
  try {
    const userId = req.user._id; // from auth middleware
    const profile = await studentProfileService.getProfileByUserId(userId);
    if (!profile) return res.status(404).json({ success: false, message: "Profile not found" });

    res.status(200).json({ success: true, profile });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* 🟢 Update My Profile (Student Only) */
const updateMyProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const profile = await studentProfileService.getProfileByUserId(userId);

    if (!profile) return res.status(404).json({ success: false, message: "Profile not found" });

    const updated = await studentProfileService.updateStudentProfile(profile._id, req.body);
    res.status(200).json({ success: true, message: "Profile updated", profile: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


  

/* 🟢 Get All Profiles (Admin/Subadmin Only) */
const getAllProfiles = async (req, res) => {
  try {
    const profiles = await studentProfileService.getAllStudentProfiles();
    res.status(200).json({ success: true, profiles });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* 🟢 Get Profile By ID (Admin/Subadmin Only) */
const getProfileById = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await studentProfileService.getStudentProfileById(id);
    if (!profile) return res.status(404).json({ success: false, message: "Profile not found" });

    res.status(200).json({ success: true, profile });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* 🟢 Update Profile By ID (Admin/Subadmin Only) */
const updateProfileById = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await studentProfileService.updateStudentProfile(id, req.body);
    if (!updated) return res.status(404).json({ success: false, message: "Profile not found" });

    res.status(200).json({ success: true, message: "Profile updated", profile: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* 🔴 Delete Profile By ID (Admin/Subadmin Only) */
const deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await studentProfileService.deleteStudentProfile(id);
    if (!deleted) return res.status(404).json({ success: false, message: "Profile not found" });

    res.status(200).json({ success: true, message: "Profile deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getMyProfile,
  updateMyProfile,
  getAllProfiles,
  getProfileById,
  updateProfileById,
  deleteProfile,
};
