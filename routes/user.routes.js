
const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const validate = require('../middlewares/validate');
const {
  generalRegisterSchema,
  studentRegisterSchema,
  loginSchema
} = require('../validation/user.validation');
const verifyAdmin = require('../middlewares/verifyAdmin');
const verifyMainAdmin = require('../middlewares/verifyMainAdmin');

// 🔹 Register/Teacher
router.post('/register', validate(generalRegisterSchema), userController.registerGeneral);

// 🔹 Register Student
router.post('/register-student', validate(studentRegisterSchema), userController.registerStudentController);


// 🔹 Login
router.post('/login', validate(loginSchema), userController.loginController);

// 🔹 Register Main or Sub Admin
router.post('/admin-register', validate(generalRegisterSchema), userController.registerAdminController);

router.get('/teachers', verifyAdmin, userController.getTeachersController);

// Admin/Sub-admin can view all students
router.get('/students', verifyAdmin, userController.getStudentsController);

module.exports = router;
