const express = require('express');
const router = express.Router();
const {teacherProfileController} = require('../controllers');
const {
  authenticateUser,
  verifyRole,
  verifyAdminOrSubadmin
} = require('../middlewares/authMiddleware');

// ✅ Self Access (Teacher Only)
router.get('/me', authenticateUser, verifyRole('teacher'), teacherProfileController.getMyProfile);
router.put('/me', authenticateUser, verifyRole('teacher'), teacherProfileController.updateMyProfile);

// ✅ Admin/Subadmin Access
router.post('/', authenticateUser, verifyAdminOrSubadmin, teacherProfileController.createTeacherProfile);
router.get('/', authenticateUser, verifyAdminOrSubadmin, teacherProfileController.getAllTeacherProfiles);
router.get('/:id', authenticateUser, verifyAdminOrSubadmin, teacherProfileController.getTeacherProfileById);
// router.put('/:id', authenticateUser, verifyAdminOrSubadmin, teacherProfileController.updateTeacherProfileById);
router.delete('/:id', authenticateUser, verifyAdminOrSubadmin, teacherProfileController.deleteTeacherProfile);

module.exports = router;
