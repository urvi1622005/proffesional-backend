import { connect } from "mongoose";
import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from "./db/db.js";


connectDB();

const app=express();
const Port=3000;
app.get('blog',(req,res) =>{
    res.status(200).json({message:"db is connected" })

});
app.use("/api/v1",router);
connectDB();

app.listen(Port, () => {
    console.log(`Server is running at: http://localhost:${Port}`);
});
