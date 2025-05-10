const {teacherProfileService} = require('../services');

// ✅ Create Teacher Profile
const createTeacherProfile = async (req, res) => {
  try {
    const data = req.body;
    const profile = await teacherProfileService.createTeacherProfile(data);
    console.log("✅ Teacher profile created successfully");
    res.status(201).json({ success: true, message: "Teacher profile created", data: profile });
  } catch (error) {
    console.error("❌ Failed to create teacher profile:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get All Teacher Profiles
const getAllTeacherProfiles = async (req, res) => {
  try {
    const profiles = await teacherProfileService.getAllTeacherProfiles();
    res.status(200).json({ success: true, data: profiles });
  } catch (error) {
    console.error("❌ Failed to fetch teacher profiles:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get Teacher Profile by ID
const getTeacherProfileById = async (req, res) => {
  try {
    const id = req.params.id;
    const profile = await teacherProfileService.getTeacherProfileById(id);
    if (!profile) {
      return res.status(404).json({ success: false, message: "Teacher profile not found" });
    }
    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    console.error("❌ Error fetching teacher profile by ID:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get Teacher Profile by User ID
const getProfileByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const profile = await teacherProfileService.getProfileByUserId(userId);
    if (!profile) {
      return res.status(404).json({ success: false, message: "Profile not found for this user" });
    }
    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    console.error("❌ Error fetching profile by user ID:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update Teacher Profile
const updateTeacherProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const updated = await teacherProfileService.updateTeacherProfile(id, updatedData);
    if (!updated) {
      return res.status(404).json({ success: false, message: "Teacher profile not found" });
    }
    console.log("✅ Teacher profile updated");
    res.status(200).json({ success: true, message: "Teacher profile updated", data: updated });
  } catch (error) {
    console.error("❌ Failed to update teacher profile:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete Teacher Profile
const deleteTeacherProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await teacherProfileService.deleteTeacherProfile(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Teacher profile not found" });
    }
    console.log("🗑️ Teacher profile deleted");
    res.status(200).json({ success: true, message: "Teacher profile deleted" });
  } catch (error) {
    console.error("❌ Failed to delete teacher profile:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ View Own Profile (Teacher)
const getMyProfile = async (req, res) => {
    try {
      const userId = req.user._id;
      const profile = await teacherProfileService.getProfileByUserId(userId);
      if (!profile) {
        return res.status(404).json({ success: false, message: "Teacher profile not found" });
      }
      res.status(200).json({ success: true, data: profile });
    } catch (error) {
      console.error("❌ Error fetching own teacher profile:", error.message);
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
  // ✅ Update Own Profile (Teacher)
  const updateMyProfile = async (req, res) => {
    try {
      const userId = req.user._id;
      const profile = await teacherProfileService.getProfileByUserId(userId);
      if (!profile) {
        return res.status(404).json({ success: false, message: "Profile not found" });
      }
      const updated = await teacherProfileService.updateTeacherProfile(profile._id, req.body);
      res.status(200).json({ success: true, message: "Profile updated", data: updated });
    } catch (error) {
      console.error("❌ Error updating own profile:", error.message);
      res.status(500).json({ success: false, message: error.message });
    }
  };
  

module.exports = {
  createTeacherProfile,
  getAllTeacherProfiles,
  getTeacherProfileById,
  getProfileByUserId,
  updateTeacherProfile,
  deleteTeacherProfile,
    getMyProfile,
    updateMyProfile
};
