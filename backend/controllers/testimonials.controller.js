import Testimonial from "../models/testimonials.js";
import { v2 as cloudinary } from 'cloudinary';
// Create Testimonial
export const createTestimonial = async (req, res) => {
  try {
    const { name, quote, course } = req.body;

    if (!name || !quote || !course) {
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

    const testimonial = await Testimonial.create({ name, quote, image: {
        public_id: cloudinaryResponse.public_id, // store the Cloudinary public ID
        url: cloudinaryResponse.secure_url, // store the Cloudinary URL
      }, course });

    res.status(201).json({
      message: "Testimonial created successfully",
      testimonial,
    });
  } catch (error) {
    console.error("Error creating testimonial:", error);
    res.status(500).json({ errors: "Server error" });
  }
};

// Get All Testimonials
export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.status(200).json({ testimonials });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    res.status(500).json({ errors: "Failed to fetch testimonials" });
  }
};

// Delete Testimonial
export const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Testimonial.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ errors: "Testimonial not found" });
    }
    res.status(200).json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    res.status(500).json({ errors: "Failed to delete testimonial" });
  }
};
