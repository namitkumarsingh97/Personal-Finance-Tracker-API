const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../controllers/userController");
const protect = require("../middlewares/auth");

const router = express.Router();

// Register a new user
router.post("/register", registerUser);

// Login User
router.post("/login", loginUser);

// Get user profile (protected route)
router.get("/profile", protect, getUserProfile);

module.exports = router;
