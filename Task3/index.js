import express from "express";
import dotenv from "dotenv";
import { connectDB} from "./db/connectDB.js";
import router from './routes/route.js';

dotenv.config();
const app =express()
const PORT =3000;

app.get('/video',(req,res) => {
    res.status(200).json({message:"db is connected"});

});
app.use("/api/vi",router);
connectDB();

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
    
})