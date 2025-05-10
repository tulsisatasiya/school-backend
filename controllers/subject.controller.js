const { subjectService } = require('../services');

// ✅ Create Subject
const createSubject = async (req, res) => {
  try {
    const subject = await subjectService.createSubject(req.body);
    res.status(201).json({ success: true, message: 'Subject created', data: subject });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get All Subjects
const getAllSubjects = async (req, res) => {
  try {
    const subjects = await subjectService.getAllSubjects();
    res.status(200).json({ success: true, data: subjects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get Subject by ID
const getSubjectById = async (req, res) => {
  try {
    const subject = await subjectService.getSubjectById(req.params.id);
    if (!subject) {
      return res.status(404).json({ success: false, message: "Subject not found" });
    }
    res.status(200).json({ success: true, data: subject });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update Subject
const updateSubject = async (req, res) => {
  try {
    const updated = await subjectService.updateSubject(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: "Subject not found" });
    }
    res.status(200).json({ success: true, message: "Subject updated", data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete Subject
const deleteSubject = async (req, res) => {
  try {
    const deleted = await subjectService.deleteSubject(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Subject not found" });
    }
    res.status(200).json({ success: true, message: "Subject deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
};
