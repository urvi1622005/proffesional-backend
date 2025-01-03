const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db/connectDb.js");

dotenv.config();
const app = express();
const PORT = 3000;

app.use(express.json());


app.get("/video", (req, res) => {
  res.status(200).json({ message: "db is connected" });
});


app.post("/video", (req, res) => {
  const { title, description, url } = req.body;

  
  if (!title || !description || !url) {
    return res.status(400).json({ error: "All fields are required" });
  }


  res.status(201).json({
    message: "Video created successfully",
    data: { title, description, url },
  });
});


connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
