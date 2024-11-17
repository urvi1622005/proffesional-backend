import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
export const connectDB =async () => {
    try{
        const mongoUri=process.env.MONGO_URI;
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDb is connected');
    }catch(error){
        console.error("MongoDB connection error:", error.message);
    }
};

