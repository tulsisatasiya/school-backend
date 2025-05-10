const express = require('express');
const router = express.Router();
const verifyAdmin = require('../middlewares/verifyAdmin');
const verifyMainAdmin = require('../middlewares/verifyMainAdmin');

// 🔐 Accessible by both admin & sub-admin
router.get('/dashboard', verifyAdmin, (req, res) => {
  res.send("Welcome Admin/Sub-admin: " + req.user.name);
});

// 🔐 Only for main admin
router.get('/main-only', verifyMainAdmin, (req, res) => {
  res.send("Only main admin allowed: " + req.user.name);
});

module.exports = router;
