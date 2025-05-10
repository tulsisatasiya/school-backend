const { registerUser, registerStudent, validateUserLogin,registerAdminOrSubAdmin,getAllTeachers, getAllStudents } = require('../services/user.service');
const TeacherProfile = require('../models/TeacherProfile.model');
const StudentProfile = require('../models/StudentProfile.model');
const { generateTokens } = require('../utils/token/generateTokens');

// Register  Teacher
// CONTROLLER
const registerGeneral = async (req, res) => {
    try {
      const teacher = await registerUser(req.body);
      const tokens = await generateTokens(teacher);
  
      res.status(201).json({
        message: 'teacher registered successfully',
        teacher,
        tokens
      });
    } catch (error) {
      console.error('Register Error:', error);
      res.status(400).json({ error: error.message });
    }
  };
  

// Register Student
// CONTROLLER
const registerStudentController = async (req, res) => {
    try {
      const student = await registerStudent(req.body);
      const tokens = await generateTokens(student);
  
      res.status(201).json({
        message: 'Student registered successfully',
        student,
        tokens
      });
    } catch (error) {
      console.error('Student Register Error:', error);
      res.status(400).json({ error: error.message });
    }
  };
  
  
  

// Login Controller


// const loginController = async (req, res) => {
//     try {
//       const user = await validateUserLogin(req.body);
  
//       // Convert mongoose document to plain JS object
//       const userObj = user.toObject();
//       delete userObj.password; // Remove password from response
  
//       const tokens = await generateTokens(user);
//       res.status(200).json({ message: 'Login successful', user: userObj, tokens });
//     } catch (error) {
//       console.error('Login Error:', error);
//       res.status(401).json({ error: error.message });
//     }
//   };
const loginController = async (req, res) => {
    try {
      const user = await validateUserLogin(req.body);
  
      // Convert mongoose document to plain JS object
      const userObj = user.toObject();
      delete userObj.password; // Remove password from response
  
      // 🔽 Auto-fetch teacher or student profile
      if (user.role === 'teacher') {
        const profile = await TeacherProfile.findOne({ user: user._id });
        userObj.profile = profile;
      }
  
      if (user.role === 'student') {
        const profile = await StudentProfile.findOne({ user: user._id });
        userObj.profile = profile;
      }
  
      const tokens = await generateTokens(user);
      res.status(200).json({ message: 'Login successful', user: userObj, tokens });
    } catch (error) {
      console.error('Login Error:', error);
      res.status(401).json({ error: error.message });
    }
  };
  

  const registerAdminController = async (req, res) => {
    try {
      const admin = await registerAdminOrSubAdmin(req.body);
      const tokens = await generateTokens(admin);
      res.status(201).json({ message: 'Admin/Sub-admin registered successfully', admin, tokens });
    } catch (error) {
      console.error('Admin Register Error:', error);
      res.status(400).json({ error: error.message });
    }
  };

  const getTeachersController = async (req, res) => {
    try {
      const teachers = await getAllTeachers();
      res.status(200).json({
        message: 'Teachers fetched successfully',
        teachers
      });
    } catch (error) {
      console.error("Fetch Teachers Error:", error);
      res.status(500).json({ error: 'Failed to fetch teachers' });
    }
  };
  
  const getStudentsController = async (req, res) => {
    try {
      const students = await getAllStudents();
      res.status(200).json({
        message: 'Students fetched successfully',
        students
      });
    } catch (error) {
      console.error("Fetch Students Error:", error);
      res.status(500).json({ error: 'Failed to fetch students' });
    }
  };

module.exports = {
  registerGeneral,
  registerStudentController,
  loginController,
    registerAdminController,
    getTeachersController,
  getStudentsController
};
