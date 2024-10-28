import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

export const connectDB =async () => {
    try{
        const mongoUri = process.env.MONGO_URI;
        await mongoose.connect(mongoUri);
        console.log("MongoDB connected");

    } catch (error){
        console.error(error);
    }
}