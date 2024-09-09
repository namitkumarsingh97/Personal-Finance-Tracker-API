const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate a JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });
};

// Register a new user
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Create a new user
    const user = await User.create({
      username,
      email,
      password,
    });

    // Return user data with JWT token
    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Login user and return a JWT token
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    // Check if the user exists and the password matches
    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        success: true,
        data: {
          _id: user._id,
          username: user.username,
          email: user.email,
          token: generateToken(user._id),
        },
      });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get user profile (protected route)
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      res.status(200).json({
        success: true,
        data: {
          _id: user._id,
          username: user.username,
          email: user.email,
        },
      });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = { registerUser, loginUser, getUserProfile };
