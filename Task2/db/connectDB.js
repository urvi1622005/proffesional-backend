import mongoose from "mongoose";


export const connectDB =async () => {
    try{
        const mongoUri=process.env.MONGO_URI;
        await mongoose.connect(mongoUri);
        console.log('MongiDb is connected');
    }catch(error){
        console.log(error);
    }
};

