import SuccessStory from "../models/SuccessStory.model.js"; // Make sure path is correct
// import cloudinary from "../utils/cloudinary.js";
// import SuccessStory from "../models/successStory.model.js";
import { v2 as cloudinary } from 'cloudinary';


export const createSuccessStory = async (req, res) => {
  const { name, course, college, quote, year, score, category } = req.body;

  try {
    // Check required fields
    if (!name || !course || !college || !quote || !year || !score || !category) {
      return res.status(400).json({ errors: "All fields are required" });
    }

    const {image} = req.files; 
    if(!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ errors: "No file uploaded" });
    }
     const allowedExtensions = ['image/jpeg', 'image/png' , 'images/webp'];
    if (!allowedExtensions.includes(image.mimetype)) {
      return res.status(400).json({
        errors: "Invalid file type. Only JPG and PNG are allowed.",
      });
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(image.tempFilePath);
    if(!cloudinaryResponse || cloudinaryResponse.error) {
      return res.status(400).json({ errors: "Error uploading image to Cloudinary" });
    }
    const storyData = {
      name,
      course,
      college,
      image: {
        public_id: cloudinaryResponse.public_id, // store the Cloudinary public ID
        url: cloudinaryResponse.secure_url, // store the Cloudinary URL
      },  // store just the image URL string
      quote,
      year,
      score,
      category,
    };

    const successStory = await SuccessStory.create(storyData);

    res.status(201).json({
      message: "Success story created successfully",
      story: successStory,
    });
  } catch (error) {
    console.error("Error creating success story:", error);
    res.status(500).json({ error: "Error creating success story" });
  }
};


export const deleteSuccessStory = async (req, res) => {
  const { id } = req.params;

  try {
    const story = await SuccessStory.findByIdAndDelete(id);

    if (!story) {
      return res.status(404).json({ errors: "Success story not found or already deleted." });
    }

    res.status(200).json({ message: "Success story deleted successfully." });
  } catch (error) {
    console.error("Error deleting success story:", error);
    res.status(500).json({ errors: "Server error while deleting success story." });
  }
};


export const getSuccessStories = async (req, res) => {
  try {
    const stories = await SuccessStory.find({});
    res.status(200).json({ stories });
  } catch (error) {
    console.error("Error fetching success stories:", error);
    res.status(500).json({ errors: "Error in getting success stories" });
  }
};

