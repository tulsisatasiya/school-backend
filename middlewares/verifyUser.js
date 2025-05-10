const jwt = require("jsonwebtoken");
const User = require("../models/user.modal");
require("dotenv").config();

const verifyUser = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ success: false, message: "Access Denied: Token Missing" });
  }

  try {
    console.log("Verifying Token:", token);

    const verified = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET_KEY);
    console.log("Verified Payload:", verified);

    const user = await User.findById(verified._id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    req.user = { _id: user._id, role: user.role };
    console.log("Verified User Object:", req.user);

    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    return res.status(400).json({ success: false, message: "Invalid Token" });
  }
};

module.exports = verifyUser;



