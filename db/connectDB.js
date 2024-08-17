import mongoose from "mongoose";


export const connectDB = async() => {
    try{
        const connectionInstance = await mongoose.connect(
            "mongodb+srv://urvashidhawan:<password>@cluster0.ulelx.mongodb.net/test"
        )
        mongoose.connect("mongodb+srv://urvashidhawan:<password>@cluster0.ulelx.mongodb.net/test")
        console.log("Mongodb connected...",connectionInstance.connection.host );
    } catch(error) {
        console.log("error connecting to mongodb");

    }

}