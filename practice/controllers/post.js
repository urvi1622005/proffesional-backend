import { Post } from "../models/model.js"; // Post model
import { User } from "../models/user.js"; // User model

/**
 * Create a new post and associate it with the logged-in user
 */
export const createPost = async (req, res) => {
  try {
    const { title, content, category } = req.body;

    // Validate required fields
    if (!title || !category) {
      return res.status(400).json({ message: "Please provide all required details." });
    }

    // Get logged-in user ID from auth middleware
    const userId = req.user; // Extracted from `auth.js` middleware
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized access." });
    }

    // Find the user in the database
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
    if (!Array.isArray(user.posts)) user.posts = []; // Ensure `posts` is an array
    user.posts.push(post._id);
    await user.save();

    res.status(201).json({ message: "Post created successfully.", post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong.", error: error.message });
  }
};

/**
 * Fetch posts and sort them by priority based on content
 * Posts containing "AI" are prioritized.
 */
export const sortfetch = async (req, res) => {
  try {
    // Use MongoDB aggregation to fetch and sort posts
    const posts = await Post.aggregate([
      {
        $addFields: {
          priority: {
            $cond: [
              { $regexMatch: { input: "$content", regex: /.*\bai\b.*/i } }, 
              1, 
              0
            ],
          },
        },
      },
      { $sort: { priority: -1, createdAt: -1 } }, // Sort by priority (AI first) and creation date
    ]);

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch posts.", error: error.message });
  }
};
