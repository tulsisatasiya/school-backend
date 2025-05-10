const express = require('express');
const router = express.Router();
const {subjectController} = require('../controllers');
const { authenticateUser, verifyAdminOrSubadmin, verifyRole } = require('../middlewares/authMiddleware');

// ✅ Anyone logged in (teacher, student, admin) can view subjects
router.get('/', authenticateUser, subjectController.getAllSubjects);
router.get('/:id', authenticateUser, subjectController.getSubjectById);

// ✅ Only admin or subadmin can manage subjects
router.post('/add', authenticateUser, verifyAdminOrSubadmin, subjectController.createSubject);
router.put('/:id', authenticateUser, verifyAdminOrSubadmin, subjectController.updateSubject);
router.delete('/:id', authenticateUser, verifyAdminOrSubadmin, subjectController.deleteSubject);

module.exports = router;
