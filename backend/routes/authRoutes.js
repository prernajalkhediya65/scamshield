const express = require("express");
const router = express.Router();
const { authLimiter } = require("../middleware/rateLimitMiddleware");

const {
    registerUser,
    loginUser,
    logoutUser,
    getMe,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

// Register
router.post("/register",  authLimiter, registerUser);

// Login
router.post("/login", authLimiter, loginUser);

// Logout
router.post("/logout", logoutUser);

// Get logged-in user
router.get("/me", protect, getMe);

module.exports = router;