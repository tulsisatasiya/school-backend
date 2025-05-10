const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
require("dotenv").config();

// ✅ General Auth Middleware
const authenticateUser = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ success: false, message: "Access Denied: Token Missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET_KEY);
    const user = await User.findById(decoded._id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    req.user = { _id: user._id, role: user.role };
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    return res.status(400).json({ success: false, message: "Invalid Token" });
  }
};

// ✅ Role Check (like: verifyRole('student'))
const verifyRole = (role) => {
  return (req, res, next) => {
    if (req.user?.role !== role) {
      return res.status(403).json({ message: `Access denied: ${role} only` });
    }
    next();
  };
};

// ✅ Admin or Sub-admin
const verifyAdminOrSubadmin = (req, res, next) => {
  const allowed = ['admin', 'sub-admin'];
  if (!allowed.includes(req.user.role)) {
    return res.status(403).json({ message: "Access denied. Admin or Sub-admin only." });
  }
  next();
};

// ✅ Main Admin Only
const verifyMainAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: "Access denied. Admin only." });
  }
  next();
};

module.exports = {
  authenticateUser,
  verifyRole,
  verifyAdminOrSubadmin,
  verifyMainAdmin
};
