const bcryptjs = require("bcryptjs");
const User = require("../model/user"); 
const jwt = require("jsonwebtoken");
const { validationResult, check } = require("express-validator");
require("dotenv").config();

exports.validateLogin = [
  check("emailOrPhone").notEmpty().withMessage("Email or phone is required"),
  check("password").notEmpty().withMessage("Password is required"),
];

// Login Controller
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


    const token = jwt.sign(
      { id: user.id, role: user.role },  
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    
    delete user.password;

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

// Change Password Controller
exports.changePassword = async (req, res) => {
  try {
   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { oldPassword, newPassword } = req.body;
    
    const userDetails = await User.findById(req.user.id);
    if (!userDetails) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

   
    const isPasswordMatch = await bcryptjs.compare(oldPassword, userDetails.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ success: false, message: "Incorrect current password" });
    }

    
    const encryptedPassword = await bcryptjs.hash(newPassword, 10);

    
    await User.updatePassword(req.user.id, encryptedPassword);

    return res.status(200).json({ success: true, message: "Password updated successfully" });

  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).json({ success: false, message: "Failed to update password" });
  }
};
