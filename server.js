require("dotenv").config();
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

// app.use("/public", express.static("public"));
// app.use("/v1/public", express.static(path.join(__dirname, "public")));
app.use('/images', express.static(path.join(__dirname, 'public/images')));


//routes
app.use("/v1", routes);

// Database Connection
connectDB();

// Start Server
const PORT = process.env.PORT || 4004;
http.createServer(app).listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
