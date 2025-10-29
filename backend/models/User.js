const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
};

// Signup
const signup = async (req, res) => {
  try {
    const { name, email, password, isAdmin: requestedAdmin } = req.body;

    // Normalize email
    const emailNormalized = email.toLowerCase().trim();

    const userExists = await User.findOne({ email: emailNormalized });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    let isAdmin = false;
    if (requestedAdmin) {
      // Only existing admins can create other admins
      if (req.user && req.user.isAdmin) isAdmin = true;
      else return res.status(403).json({ message: 'Only admins can create admins' });
    }

    // Create user (password will be hashed automatically)
    const user = await User.create({
      name,
      email: emailNormalized,
      password,
      isAdmin,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailNormalized = email.toLowerCase().trim();

    const user = await User.findOne({ email: emailNormalized });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { signup, login };
