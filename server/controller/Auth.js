const bcryptjs = require("bcryptjs");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const { validationResult, check } = require("express-validator");
require("dotenv").config();

exports.validateSignup = [
  check("name").notEmpty().withMessage("Name is required"),
  check("email").isEmail().withMessage("Valid email is required"),
  check("phone").notEmpty().withMessage("Phone number is required"),
  check("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
  check("role").isIn(["admin", "user", "moderator"]).withMessage("Invalid role"),
];

// 🔹 Signup Controller
exports.signup = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, email, phone, role, password } = req.body;

    const existingUser = await User.findByEmailOrPhone(email);
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = await User.create(name, email, phone, role, hashedPassword);

    const token = jwt.sign({ id: newUser.id, role: newUser.role }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    return res.status(201).json({
      success: true,
      token,
      user: newUser,
      message: "Signup successful",
    });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ success: false, message: "Signup failed. Please try again." });
  }
};

exports.validateLogin = [
  check("emailOrPhone").notEmpty().withMessage("Email or phone is required"),
  check("password").notEmpty().withMessage("Password is required"),
];

// 🔹 Login Controller
exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { emailOrPhone, password } = req.body;
    const user = await User.findByEmailOrPhone(emailOrPhone);

    if (!user) {
      return res.status(401).json({ success: false, message: "User not found. Please sign up." });
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ success: false, message: "Incorrect password" });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    // delete user.password;

    return res.status(200).json({
      success: true,
      token,
      user,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ success: false, message: "Login failed. Please try again." });
  }
};

exports.validateChangePassword = [
  check("oldPassword").notEmpty().withMessage("Current password is required"),
  check("newPassword")
    .isLength({ min: 8 })
    .withMessage("New password must be at least 8 characters long"),
];

exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    // Fetch user from DB using the authenticated user ID
    const userQuery = await pool.query("SELECT * FROM users WHERE id = $1", [req.user.id]);

    
    if (userQuery.rows.length === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const userDetails = userQuery.rows[0];

    // Check if old password matches
    const isPasswordMatch = await bcryptjs.compare(oldPassword, userDetails.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ success: false, message: "Incorrect current password" });
    }

    // Hash the new password
    const encryptedPassword = await bcryptjs.hash(newPassword, 10);

    // Update password in the database
    await pool.query("UPDATE users SET password = $1, updated_at = NOW() WHERE id = $2", [
      encryptedPassword,
      req.user.id,
    ]);

    return res.status(200).json({ success: true, message: "Password updated successfully" });

  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).json({ success: false, message: "Failed to update password" });
  }
};

