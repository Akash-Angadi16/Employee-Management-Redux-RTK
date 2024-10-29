// require("dotenv").config();
// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const port = process.env.PORT || 3000;
// const cors = require("cors");
// const User = require("./models/user.js");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors());

// //connecting to data base
// mongoose
//   .connect("mongodb://localhost:27017/EmployeeDB")
//   .then(() => console.log("DB is connected"))
//   .catch((err) => console.log("Error in DB connection", err));

// app.post("/api/users", async (req, res) => {
//   try {
//     // obtain the data from frontend
//     const { name, email, password } = req.body;

//     // check if the email entered by the user is already existing in DB
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.json({ code: 0, message: "Email already exists !!" });
//     }

//     // for storing data of a new user, salt and hash the passwords
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // insert the data into DB
//     let newUser = new User({ name, email, password: hashedPassword });
//     await newUser.save();

//     // respond with token and success message
//     return res.status(201).json({
//       code: 1,
//       message: "User created successfully",
//       newUser,
//     });
//   } catch (err) {
//     return res.status(500).json({ code: 0, message: "Server error" });
//   }
// });

// app.post("/api/login", async (req, res) => {
//   try {
//     let { email, password } = req.body;
//     const user = await User.findOne({ email });

//     // Check if user's email exists
//     if (!user) {
//       return res.status(404).json({ message: "This email does not exist" });
//     }

//     // Compare passwords
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     // Generate token
//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     // Respond with token
//     res.json({
//       token,
//       code: 1,
//       message: "Logged in successfully",
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// //Verification of token
// app.post("/api/verify-token", (req, res) => {
//   const token = req.header("Authorization")?.replace("Bearer ", "");
//   if (!token) {
//     return res.status(401).json({ message: "Access Denied" });
//   }
//   try {
//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     res.json({ valid: true, user: verified });
//   } catch (error) {
//     res.status(400).json({ message: "Invalid token" });
//   }
// });

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Database connection
mongoose
  .connect("mongodb://localhost:27017/EmployeeDB")
  .then(() => console.log("DB is connected"))
  .catch((err) => console.log("Error in DB connection", err));

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api", authRoutes);

//CRUD  operations for employees
const employeeRoutes = require("./routes/employeeRoutes");
app.use("/employee", employeeRoutes);

//Test route
app.get("/Test", (req, res) => {
  res.send("server is running");
});

//Creating the server to run on port
app.listen(port, () => {
  console.log(`server is listening to port ${port}`);
});
