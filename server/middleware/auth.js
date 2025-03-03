const passport = require("passport");
const jwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const dotenv = require("dotenv");
const pool = require("../config/database");

dotenv.config();

// 🔹 JWT Passport Strategy Setup
passport.use(
  new jwtStrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract token from "Authorization" header
    },
    async (jwtPayload, done) => {
      try {
        const query = "SELECT id, name, email, role FROM users WHERE id = $1 LIMIT 1;";
        const { rows } = await pool.query(query, [jwtPayload.id]);

        if (rows.length === 0) {
          return done(null, false, { message: "User not found" });
        }

        return done(null, rows[0]); // Attach user to request
      } catch (error) {
        console.error("Error in passport JWT strategy:", error.message);
        return done(error, false);
      }
    }
  )
);

// 🔹 Middleware to Initialize Passport
exports.initializePassport = passport.initialize();

// 🔹 Auth Middleware (Now Using Passport.js)
exports.auth = passport.authenticate("jwt", { session: false });

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
