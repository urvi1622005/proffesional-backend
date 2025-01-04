import express from "express";
import { connectDB } from "./db/connectDB.js";
import dotenv from"dotenv";
import userRouter from "./routes/userRouter.js";
import postRouter from "./routes/postRouter.js";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
const PORT = 3000;

app.use(express.json());


app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1", userRouter);
app.use("/api/v1", postRouter);

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
