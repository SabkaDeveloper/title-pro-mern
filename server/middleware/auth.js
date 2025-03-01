const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const pool = require("../config/database");
const { check } = require("express-validator");

dotenv.config();

// 🔹 Validation Middleware (Optional)
exports.validateAuth = [
  check("token").optional().isString().withMessage("Token must be a valid string"),
];

// 🔹 Authentication Middleware (Validates Token & Fetches User)
exports.auth = async (req, res, next) => {
  try {
    const token = extractToken(req);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication token is required",
      });
    }

    // Verify and decode token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    // Fetch user details from database
    const query = "SELECT id, name, email, role FROM users WHERE id = $1 LIMIT 1;";
    const { rows } = await pool.query(query, [decoded.id]);

    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = rows[0]; // Attach user to request
    next();

  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error during authentication",
    });
  }
};

// 🔹 Role-based Authorization Middleware
exports.authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "User authentication required",
        });
      }

      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: `Access denied for role: ${req.user.role}`,
        });
      }

      next();
    } catch (error) {
      console.error("Role Authorization Error:", error.message);
      return res.status(500).json({
        success: false,
        message: "Error verifying user role",
      });
    }
  };
};

// 🔹 Admin-only Access Middleware
exports.adminAuth = exports.authorizeRoles("admin");

// 🔹 Utility: Extract Token from Headers
function extractToken(req) {
  const authHeader = req.header("Authorization");
  return authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
}
