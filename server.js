require("dotenv").config(); // Load environment variables from .env file
const http = require("http");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./db/dbConnect");
const routes = require("./routes");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

// Middleware
app.use(cors({ origin: "*", credentials: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Static file handling for images
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Routes
app.use("/v1", routes);

// Database Connection
connectDB();

// Start Server on specified PORT from environment variable or default to 5000
const PORT = process.env.PORT || 5000;
http.createServer(app).listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
