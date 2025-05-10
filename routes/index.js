
const express = require("express");
const route = express.Router();

const branchRoute = require("./branch.routes");
const userRoute = require("./user.routes");
const classRoute = require("./class.routes");
const studentProfileRoute = require("./studentProfile.routes");
const teacherProfileRoute = require("./teacherProfile.routes");
const subjectRoute = require("./subject.routes");



route.use("/branch", branchRoute);
route.use("/user", userRoute);
route.use("/class", classRoute);
route.use("/student-profile", studentProfileRoute);
route.use("/teacher-profile", teacherProfileRoute);
 route.use("/subject", subjectRoute);




module.exports = route;
