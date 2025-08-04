import mongoose from 'mongoose';

const SuccessStorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  course: { type: String, required: true },
  college: { type: String, required: true },
  image: {
     public_id: { type: String, required: true }, // Cloudinary public ID
     url: { type: String, required: true } // Cloudinary URL  
    },
  quote: { type: String, required: true },
  year: { type: String, required: true },
  score: { type: String, required: true },
  category: { type: String, required: true },
});

const SuccessStory = mongoose.model('SuccessStory', SuccessStorySchema);

export default SuccessStory;

