const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");
const nodemailer = require("nodemailer");
require("dotenv").config();

///------------------------------------------------------------------------------------------------------------------
// Register user

router.post("/users", async (req, res) => {
  try {
    const { name, email, password, creator } = req.body; // Ensure creator is included

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ code: 0, message: "Email already exists!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const ip = req.ip;
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      creator, // Ensure creator is set
      ip,
    });
    await newUser.save();

    res
      .status(201)
      .json({ code: 1, message: "User created successfully", newUser });
  } catch (err) {
    console.error("Server error:", err); // Log detailed error
    res.status(500).json({ code: 0, message: "Server error" });
  }
});

/// ----------------------------------------------------------------------------------------------------------//

///EMAIL SERVICE
const transporter = nodemailer.createTransport({
  host: "shriramsoftwares.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post("/verify-email", async (req, res) => {
  const { email } = req.body;
  console.log("Request body :", req.body);

  const user = await User.findOne({ email });

  if (!user) {
    return res.json({ code: 0, message: "User not found." });
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  const verifyUrl = `http://localhost:3000/api/verify?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Email Verification",
    html: `<p>Thanks for registering! Click <a href="${verifyUrl}">here</a> to verify your email.</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.json({ code: 0, message: "Error sending email." });
    }
    res.json({ code: 1, message: "Verification email sent!" });
  });
});

/// ----------------------------------------------------------------------------------------------------------//
//Verfy the email recieved
router.get("/verify", async (req, res) => {
  const { token } = req.query;

  jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
    if (error) {
      return res.status(400).send("Invalid or expired token.");
    }

    const user = await User.findOne({ email: decoded.email });
    if (user) {
      user.verify = true;
      await user.save();
      res.send("Email verified! You can now log in.");
    } else {
      res.status(400).send("User not found.");
    }
  });
});

/// ----------------------------------------------------------------------------------------------------------//
// Login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "This email does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ message: "Invalid email or password" });
    }

    if (user.verify == true) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.json({ token, user, code: 1, message: "Logged in successfully" });
    } else {
      res.json({ code: 0, message: "Please verify your email" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/// ----------------------------------------------------------------------------------------------------------//
// Verify token
router.post("/verify-token", (req, res) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "Access Denied" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ valid: true, user: verified });
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
});

module.exports = router;
