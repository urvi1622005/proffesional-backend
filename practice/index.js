import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from '../Blog/db/connectDb';
const Router =express.Router();
 
dotenv.config();

const app=express();
const PORT=3000;
app.get('/', (req, res) => {
    res.send('Hello World');
})
app.listen(3000,()=> {

})