const User = require('../models/User.model');
const StudentProfile = require('../models/StudentProfile.model');
const TeacherProfile = require('../models/TeacherProfile.model');
const bcrypt = require('bcrypt');

// General Register ( Teacher)
// const registerUser = async (userData) => {
//     const { name, email, phone, password, role, branch, ...profileFields } = userData;
  
//     if (role !== 'teacher') {
//         throw new Error('Role must be teacher for teacher registration');
//       }

//     const existing = await User.findOne({ $or: [{ email }, { phone }] });
//     if (existing) throw new Error('Email or phone already exists');
  
//     const hashedPassword = await bcrypt.hash(password, 10);
  
//     // Create user
//     const newUser = await User.create({
//       name,
//       email,
//       phone,
//       password: hashedPassword,
//       role,
//       branch
//     });
  
//     // Auto-create TeacherProfile if role is teacher
    
//       await TeacherProfile.create({
//         ...profileFields, // Includes dob, qualification, etc.
//         user: newUser._id,
//         branch,
//         phone,
//         email
//       });
    
  
//     return newUser;
//   };
const registerUser = async (teacherData) => {
    const { name, email, phone, password, role, branch, ...profileFields } = teacherData;
  
    const existing = await User.findOne({ $or: [{ email }, { phone }] });
    if (existing) throw new Error('Email or phone already exists');
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // 1. Create user
    const newUser = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role,
      branch
    });
  
    // 2. Auto-create TeacherProfile
    if (role === 'teacher') {
      // ➕ Auto-generate employeeId
      const lastProfile = await TeacherProfile.findOne().sort({ createdAt: -1 });
      const lastId = lastProfile?.employeeId?.replace('EMP', '') || '000';
      const newEmployeeId = 'EMP' + String(Number(lastId) + 1).padStart(3, '0');
  
      await TeacherProfile.create({
        ...profileFields,
        user: newUser._id,
        branch,
        phone,
        email,
        employeeId: newEmployeeId  // ← Add this
      });
    }
  
    return newUser;
  };
   
  

  const registerStudent = async (data) => {
    const { name, email, phone, password, role, branch, ...profileFields } = data;
  
    console.log("▶️ Starting student registration with data:", data); // Log incoming data
  
    const existing = await User.findOne({ $or: [{ email }, { phone }] });
    if (existing) throw new Error('Email or phone already exists');
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const studentUser = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role,
      branch,
    });
  
    console.log("✅ User created with ID:", studentUser._id);
  
    if (role === 'student') {
      console.log("🎯 Role is student. Generating enrollment number...");
  
      const lastStudent = await StudentProfile.findOne().sort({ createdAt: -1 });
      const lastEnrollNum = lastStudent?.enrollmentNumber?.replace('ER', '') || '000';
      const newEnrollmentNumber = 'ER' + String(Number(lastEnrollNum) + 1).padStart(3, '0');
  
      console.log("🆕 New enrollment number:", newEnrollmentNumber);
  
      const newProfile = await StudentProfile.create({
        ...profileFields,
        user: studentUser._id,
        name,
        role,
        branch,
        email,
        phone,
        enrollmentNumber: newEnrollmentNumber,
      });
      
  
      console.log("📄 StudentProfile created with ID:", newProfile._id);
    }
  
    return studentUser;
  };
  
  
  
  
  
  

// Only checks credentials
const validateUserLogin = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid email or password');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid email or password');

  return user;
};

const registerAdminOrSubAdmin = async (userData) => {
    const existing = await User.findOne({ $or: [{ email: userData.email }, { phone: userData.phone }] });
    if (existing) throw new Error('Email or phone already exists');
  
    if (!['admin', 'sub-admin'].includes(userData.role)) {
      throw new Error('Role must be admin or sub-admin');
    }
  
    // Sub-admin must have branch
    if (userData.role === 'sub-admin' && !userData.branch) {
      throw new Error('Sub-admin must be assigned to a branch');
    }
  
    const hashedPassword = await bcrypt.hash(userData.password, 10);
  
    const payload = {
      ...userData,
      password: hashedPassword
    };
  
    // Remove branch for main admin
    if (userData.role === 'admin') {
      delete payload.branch;
    }
  
    const newAdmin = await User.create(payload);
  
    return newAdmin;
  };
  
  const getAllTeachers = async () => {
    const teachers = await User.find({ role: 'teacher' }).lean();
    const teacherProfiles = await TeacherProfile.find({}).lean();
  
    return teachers.map(teacher => ({
      ...teacher,
      profile: teacherProfiles.find(p => String(p.user) === String(teacher._id)) || null
    }));
  };
  
  // Get all students with profile
  const getAllStudents = async () => {
    const students = await User.find({ role: 'student' }).lean();
    const studentProfiles = await StudentProfile.find({}).lean();
  
    return students.map(student => ({
      ...student,
      profile: studentProfiles.find(p => String(p.user) === String(student._id)) || null
    }));
  };
  

module.exports = {
  registerUser,
  registerStudent,
  validateUserLogin,
  registerAdminOrSubAdmin,
  getAllTeachers,
  getAllStudents
};
