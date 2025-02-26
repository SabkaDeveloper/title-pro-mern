const express = require("express");
const router = express.Router();
const { login, validateLogin, changePassword, validateChangePassword } = require("../controller/Auth");
const { auth } = require("../middleware/auth");

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// Login route
router.post("/login", validateLogin, login);

// Change Password route (protected)
router.post("/change-password", auth, validateChangePassword, changePassword);

module.exports = router;
