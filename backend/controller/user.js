const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ================= SIGNUP =================
const userSignup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Basic validation
    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User with that email or username already exists" });
    }

    const hashPwd = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hashPwd });

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      user: { id: newUser._id, email: newUser.email, username: newUser.username },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ================= LOGIN =================
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user._id, email: user.email, username: user.username }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "lax" });
    return res.status(200).json({ success: true, message: "Login successful", user: { id: user._id, email: user.email, username: user.username } });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ================= GET CURRENT USER =================
const getUser = async (req, res) => {
  try {
    // auth middleware should have attached req.user
    if (!req.user) {
      return res.status(401).json({ message: "Unauthenticated" });
    }
    const user = await User.findById(req.user.id).select("email");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user: { id: user._id, email: user.email } });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { userSignup, userLogin, getUser };
