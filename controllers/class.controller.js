const {classService} = require("../services");

// 🔹 Create class
const createClassController = async (req, res) => {
  try {
    const classData = await classService.addClass(req.body);
    res.status(201).json({ success: true, message: "Class created successfully", data: classData });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 🔹 Get all classes
const getAllClassesController = async (req, res) => {
  try {
    const classes = await classService.getAllClasses();
    res.status(200).json({ success: true, data: classes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🔹 Get single class
const getClassByIdController = async (req, res) => {
  try {
    const classItem = await classService.getClassById(req.params.id);
    if (!classItem) return res.status(404).json({ success: false, message: "Class not found" });

    res.status(200).json({ success: true, data: classItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🔹 Update class
const updateClassController = async (req, res) => {
  try {
    const updated = await classService.updateClass(req.params.id, req.body);
    res.status(200).json({ success: true, message: "Class updated successfully", data: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 🔹 Delete class
const deleteClassController = async (req, res) => {
  try {
    await classService.deleteClass(req.params.id);
    res.status(200).json({ success: true, message: "Class deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createClassController,
  getAllClassesController,
  getClassByIdController,
  updateClassController,
  deleteClassController,
};
