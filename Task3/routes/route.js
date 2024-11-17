import Video from '../models/model.js';

export const createVideo = async (req, res) => {
  try {
    const { title, description, url } = req.body; // Fix: destructure from req.body

    const video = new Video({ title, description, url }); // Fix: Video constructor syntax
    await video.save(); // Fix: Ensure the video is saved in the database

    res.status(200).json({ message: 'Video created successfully', video });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
