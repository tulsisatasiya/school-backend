const express = require('express');
const router = express.Router();
const { studentProfileController } = require('../controllers');
const {
  authenticateUser,
  verifyAdminOrSubadmin,
  verifyRole
} = require('../middlewares/authMiddleware');

//  Student Self Routes
router.get('/me', authenticateUser, verifyRole('student'), studentProfileController.getMyProfile);
router.put('/me', authenticateUser, verifyRole('student'), studentProfileController.updateMyProfile);

// Admin/Sub-admin Routes(check baki )
router.get('/', authenticateUser, verifyAdminOrSubadmin, studentProfileController.getAllProfiles);
router.get('/:id', authenticateUser, verifyAdminOrSubadmin, studentProfileController.getProfileById);
router.put('/:id', authenticateUser, verifyAdminOrSubadmin, studentProfileController.updateProfileById);
router.delete('/:id', authenticateUser, verifyAdminOrSubadmin, studentProfileController.deleteProfile);

module.exports = router;
