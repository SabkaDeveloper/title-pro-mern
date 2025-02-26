const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const pool = require("../config/database"); 
const { check, validationResult } = require("express-validator");

dotenv.config();


exports.validateAuth = [
  check("token").optional().isString().withMessage("Token must be a valid string"),
];

// Middleware for authenticating user requests
exports.auth = async (req, res, next) => {
  try {
   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

   
    const token = req.body.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ success: false, message: "Token is missing" });
    }

    try {
    
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      
      const result = await pool.query("SELECT id, name, email, role FROM users WHERE id = $1", [decoded.id]);

      if (result.rows.length === 0) {
        return res.status(401).json({ success: false, message: "User not found" });
      }

      req.user = result.rows[0]; 
      next(); 
    } catch (error) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while validating token",
    });
  }
};

// Role-based authorization middleware
exports.authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    try {
    
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: `Access denied for role: ${req.user.role}`,
        });
      }
      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error verifying user role",
      });
    }
  };
};
