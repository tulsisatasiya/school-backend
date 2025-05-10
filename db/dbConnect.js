const mongoose = require("mongoose");
require("dotenv").config(); 

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(` MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(" MongoDB Connection Error:", error.message);
    process.exit(1); 
  }
};

module.exports = connectDB; // 
