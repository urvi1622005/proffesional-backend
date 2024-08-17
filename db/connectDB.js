import mongoose from "mongoose";


export const connectDB = async() => {
    try{
        mongoose.connect("mongodb+srv://urvashidhawan:<password>@cluster0.ulelx.mongodb.net/test")
        .then(()=>console.log("Mongodb connected..."));
    }catch(error){
        console.log("error connecting to mongodb");

    }

}