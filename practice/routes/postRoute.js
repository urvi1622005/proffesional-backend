import express from "express";
import { Post } from "../models/Post.js";

const router = express.Router();

// Route to create a new post
router.post("/posts", async (req, res) => {
  try {
    const { title, content } = req.body;
    const newPost = new Post({ title, content });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to fetch and rank posts
router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find({});
    const rankedPosts = posts.sort((a, b) => {
      const aContainsAI = a.content.toLowerCase().includes("ai");
      const bContainsAI = b.content.toLowerCase().includes("ai");
      return bContainsAI - aContainsAI; // Rank posts with "AI" higher
    });
    res.status(200).json(rankedPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
