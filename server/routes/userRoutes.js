import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

const generateToken = (id) => {
  const secret = process.env.JWT_SECRET || "fallback_temporary_development_secret_stream_99x";
  return jwt.sign({ id }, secret, { expiresIn: "30d" });
};

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Field integrity verification
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All input registration fields are required." });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Passcode length must be atleast 6 characters." });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "An account with this email already exists." });
    }

    const user = await User.create({ name, email, password });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Registration failure", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password inputs are required." });
    }

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password credentials." });
    }
  } catch (error) {
    res.status(500).json({ message: "Login server failure", error: error.message });
  }
});

export default router;