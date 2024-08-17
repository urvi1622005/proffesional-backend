import express from 'express';
import {connectDB} from "./db/connectDB.js";


const app = express();

connectDB();


app.listen(3000,()=> {
    console.log("server is running on port 3000");
});