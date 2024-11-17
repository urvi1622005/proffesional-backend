import Video from '../models/model.js';

export const createVideo = async (req, res) => {
  try {
    const { title, description, url } = req.body; // Destructure all fields in a single line

    // Create a new video instance
    const newVideo = new Video({ title, description, url });

    // Save the new video to the database
    await newVideo.save();

    // Respond with a success message and the created video data
    res.status(201).json({
      message: "Video created successfully",
      video: newVideo,
    });
  } catch (error) {
    // Catch any errors and return a 500 status with the error message
    console.error(error);
    res.status(500).json({
      message: "Error creating video",
      error: error.message,
    });
  }
};
