import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  name: String,
  course: String,
  image: {
     public_id: { type: String, required: true }, // Cloudinary public ID
     url: { type: String, required: true } // Cloudinary URL  
    }, // can be emoji or image URL
  quote: String,
});

const Testimonial = mongoose.model('Testimonial', testimonialSchema);
export default Testimonial;
