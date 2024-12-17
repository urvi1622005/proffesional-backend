// Import necessary modules
import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export const connectDb =async () => {
    try{
        const mongoUri = process.env.MONGO_URI;
        console.log("Mongo URI:", mongoUri);
        await mongoose.connect(mongoUri);
        console.log("MongoDB connected");

    } catch (error){
        console.error(error);
    }
}