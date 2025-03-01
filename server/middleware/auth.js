const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const pool = require("../config/database");
const { check } = require("express-validator");

dotenv.config();

// 🔹 Validation Middleware for Auth (if needed)
exports.validateAuth = [
  check("token").optional().isString().withMessage("Token must be a valid string"),
];

// 🔹 Authentication Middleware
exports.auth = async (req, res, next) => {
  try {
    const token = extractToken(req);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication token is required",
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    const { rows } = await pool.query(
      "SELECT id, name, email, role FROM users WHERE id = $1",
      [decoded.id]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = rows[0]; // Attach user to request
    next();

  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error while validating token",
    });
  }
};

// 🔹 Role-based Authorization Middleware
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
      console.error("Role Authorization Error:", error);
      return res.status(500).json({
        success: false,
        message: "Error verifying user role",
      });
    }
  };
};

// 🔹 Admin-only Access Middleware
exports.adminAuth = (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access restricted to admins only",
      });
    }
    next();
  } catch (error) {
    console.error("Admin Auth Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error verifying admin access",
    });
  }
};

// 🔹 Utility: Extract token from headers or body
function extractToken(req) {
  const authHeader = req.header("Authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.replace("Bearer ", "");
  }
  return req.body.token || null; // Fallback to body token (optional)
}
