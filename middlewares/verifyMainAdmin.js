const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
require("dotenv").config();

const verifyMainAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided." });

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET_KEY);
    const user = await User.findById(decoded._id);

    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Main Admin Check Error:", err.message);
    return res.status(401).json({ message: "Invalid token." });
  }
};

module.exports = verifyMainAdmin;
