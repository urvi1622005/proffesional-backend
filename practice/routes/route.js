
const express = require("express");
const router = express.Router();
const Post = require("../models/model.js");

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    const rankedPosts = posts.sort((a, b) => {
      const aHasAI = a.content.toLowerCase().includes("ai");
      const bHasAI = b.content.toLowerCase().includes("ai");
      return bHasAI - aHasAI; 
    });
    res.status(200).json(rankedPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post("/", async (req, res) => {
  const { title, content } = req.body;

  try {
    const newPost = new Post({ title, content });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
