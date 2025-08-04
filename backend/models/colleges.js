import mongoose from 'mongoose';

const collegeSchema = new mongoose.Schema({
  name: String,
  location: String,
  courses: String,
  grade: String,
  image: {
     public_id: { type: String, required: true }, // Cloudinary public ID
     url: { type: String, required: true } // Cloudinary URL  
    },
    fees : String,
    seat : String,  
    established: String, 
});

const College = mongoose.model('College', collegeSchema);
export default College;
