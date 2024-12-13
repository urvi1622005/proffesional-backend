// Import necessary modules
import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Database connection function
export const connectDb = async () => {
    try {
        // Get MongoDB URI from environment variables
        const mongoUri = process.env.MONGO_URI;

        // Check if MONGO_URI is provided
        if (!mongoUri) {
            throw new Error("MONGO_URI is not defined in the environment variables.");
        }

        console.log("Connecting to MongoDB...");

        // Connect to MongoDB with options
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,          // Parses MongoDB connection string correctly
            useUnifiedTopology: true,      // Handles monitoring servers in the cluster
            serverSelectionTimeoutMS: 5000 // Timeout after 5 seconds if the server is unavailable
        });

        console.log("MongoDB connected successfully!");
    } catch (error) {
        // Log error details for debugging
        console.error("Failed to connect to MongoDB:", error.message);

        // Optional: Exit the application if the connection fails
        process.exit(1);
    }
};
