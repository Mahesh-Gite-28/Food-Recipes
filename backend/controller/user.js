const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ================= SIGNUP =================
const userSignup = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashPwd = await bcrypt.hash(password, 10);

    await User.create({
      email,
      password: hashPwd
    });

    return res.status(201).json({ message: "Account created" });

  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

// ================= LOGIN =================
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
    //   secure: true,       // HTTPS only
    //   sameSite: "strict"  // CSRF protection
    });

    return res.status(200).json({ message: "Login successful" });

  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { userSignup, userLogin };


const getUser=async (req,res)=>
{
    
}


module.exports={userSignup,userLogin,getUser}