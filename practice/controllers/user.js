import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// JWT secret key (replace with a secure key in production)
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"; // Set this in environment variables

// Function to generate a JWT with expiration
const generateJWT = (user) => {
  const payload = {
    id: user._id,
    name: user.name,
    email: user.email,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "14d" });
};

// Register a new user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered." });
    }

    const user = new User({ name, email, password });
    await user.save();

    const token = generateJWT(user);
    res.status(201).json({ message: "User registered successfully.", token });
  } catch (error) {
    console.error("Error during registration:", error.message);
    res.status(500).json({ message: "Something went wrong.", error: error.message });
  }
};

// Login a user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = generateJWT(user);

    res.status(200).json({ message: "Logged in successfully.", token });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ message: "Something went wrong.", error: error.message });
  }
};

// Middleware to verify JWT
export const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    console.error("JWT verification failed:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(403).json({ message: "Token expired. Please log in again." });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(403).json({ message: "Invalid token." });
    }

    res.status(403).json({ message: "Authorization failed." });
  }
};
