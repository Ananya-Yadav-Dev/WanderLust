const User = require("../models/User");
const { generateToken } = require("../utils/jwtUtils");

module.exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "Username already exists"
      });
    }

    const newUser = new User({ email, username, password });
    await newUser.save();

    const token = generateToken(newUser._id);
    const userResponse = {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email
    };

    res.status(201).json({
      success: true,
      data: {
        user: userResponse,
        token
      },
      message: "Welcome to WanderLust"
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      error: e.message
    });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Invalid username or password"
      });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: "Invalid username or password"
      });
    }

    const token = generateToken(user._id);
    const userResponse = {
      _id: user._id,
      username: user.username,
      email: user.email
    };

    res.json({
      success: true,
      data: {
        user: userResponse,
        token
      },
      message: "Welcome back to Wanderlust"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports.getCurrentUser = async (req, res) => {
  const userResponse = {
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email
  };

  res.json({
    success: true,
    data: userResponse
  });
};

module.exports.logout = (req, res) => {
  res.json({
    success: true,
    message: "You are logged out"
  });
};
