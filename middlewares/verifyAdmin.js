
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
require("dotenv").config();

const verifyAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET_KEY);
    const user = await User.findById(decoded._id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    if (user.role !== "admin" && user.role !== "sub-admin") {
      return res.status(403).json({ success: false, message: "Access denied. Admin or Sub-admin only." });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    return res.status(401).json({ success: false, message: "Invalid token." });
  }
};

module.exports = verifyAdmin;
