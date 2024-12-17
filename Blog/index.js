import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './db/connectDb.js';
const router =express.Router();

dotenv.config();

const app = express();
const Port = 3000;

// Connect to the database

// Define a simple route
app.get('/blog', (req, res) => {
    res.status(200).json({ message: "DB is connected" });
});

// Use a router (future-proofing for API routes)

// router.get('/test', (req, res) => {
//     res.status(200).json({ message: "API is working" });

app.use("/api/v1", router);
connectDb();
// Start the server
app.listen(Port, () => {
    console.log(`Server is running at: http://localhost:${Port}`);
});
