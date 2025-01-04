import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./db/connectDb.js";
import userRouter from "./routes/userRoute.js";
import postRouter from "./routes/postRoute.js";

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1/users", userRouter); // User-related routes
app.use("/api/v1/posts", postRouter); // Post-related routes

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.stack); // Log error stack
  res.status(500).json({ message: "Internal Server Error" });
});

// Function to start the server
const startServer = async () => {
  try {
    // Connect to the database
    await connectDB();
    console.log("Connected to the database successfully.");

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error.message);
    process.exit(1); // Exit the process on failure
  }
};

// Start the server
startServer();
