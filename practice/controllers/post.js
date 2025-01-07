import { Post } from "../models/model.js";
import { User } from "../models/user.js";

// Create Post Controller
export const createPost = async (req, res) => {
  try {
    const { title, content, category } = req.body;

    // Validate required fields
    if (!title || !category) {
      return res.status(400).json({ message: "Please provide all required details." });
    }

    // Get logged-in user ID
    const userId = req.user; // Extracted from `auth.js` middleware
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Create the post
    const post = new Post({
      title,
      content,
      category,
      user: userId,
    });
    await post.save();

    // Associate the post with the user
    user.posts.push(post._id);
    await user.save();

    res.status(201).json({ message: "Post created successfully.", post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong.", error: error.message });
  }
};

// Fetch and Sort Posts
export const sortfetch = async (req, res) => {
  try {
    // MongoDB queries to prioritize posts containing "AI"
    const postsWithAI = await Post.find({ content: { $regex: /\bai\b/i } }).exec(); // "AI" priority
    const postsWithoutAI = await Post.find({ content: { $not: /\bai\b/i } }).exec(); // Others

    // Merge results: AI posts first
    const sortedPosts = [...postsWithAI, ...postsWithoutAI];

    res.status(200).json(sortedPosts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Failed to fetch posts.", error: error.message });
  }
};
