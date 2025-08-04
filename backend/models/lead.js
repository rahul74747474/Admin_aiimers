import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  course: String,
  location: String, // renamed from location
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Lead = mongoose.model('Lead', leadSchema);
export default Lead;
