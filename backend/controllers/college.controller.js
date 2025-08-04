import College from "../models/colleges.js";
import { v2 as cloudinary } from 'cloudinary';

// Create College
export const createCollege = async (req, res) => {
  try {
    const { name, location, courses, grade , established} = req.body;

    if (!name || !location || !courses || !grade || !established) {
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

    const college = await College.create({ name, location, courses, grade,established,image: {
        public_id: cloudinaryResponse.public_id, // store the Cloudinary public ID
        url: cloudinaryResponse.secure_url, // store the Cloudinary URL
      } });

    res.status(201).json({
      message: "College added successfully",
      college,
    });
    console.log(college);
  } catch (error) {
    console.error("Error creating college:", error);
    res.status(500).json({ errors: "Server error" });
  }
};

// Get All Colleges
export const getColleges = async (req, res) => {
  try {
    const colleges = await College.find();
    res.status(200).json({ colleges });
  } catch (error) {
    console.error("Error fetching colleges:", error);
    res.status(500).json({ errors: "Failed to fetch colleges" });
  }
};

// Delete College
export const deleteCollege = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await College.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ errors: "College not found" });
    }
    res.status(200).json({ message: "College deleted successfully" });
  } catch (error) {
    console.error("Error deleting college:", error);
    res.status(500).json({ errors: "Failed to delete college" });
  }
};
