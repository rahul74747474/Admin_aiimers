import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose"
import courseRoute from "./routes/course.route.js";
import adminRoute from "./routes/admin.route.js";
import testimonialRoute from "./routes/testimonial.route.js";
import collegeRoute from "./routes/college.route.js";
import leadRoute from "./routes/lead.route.js";
import fileUpload from "express-fileupload";

import cors from "cors";
import { v2 as cloudinary } from 'cloudinary';
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();


//middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false })); 
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.static("public"));


const port = process.env.PORT || 5000;
const DB_URI = process.env.MONGO_URI;

try {
  await mongoose.connect("mongodb+srv://aiimers:123aiimer123@cluster0.6yfcfsg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
  console.log("Connected to MongoDB");
} catch (error) {
  console.log(error);
  
}

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});




app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : './tmp/'
}));


// defining routes
app.use("/api/v1/admin/listing", courseRoute);
app.use("/api/v1/admin", adminRoute);

app.use("/api/v1/admin/testimonials", testimonialRoute);
app.use("/api/v1/admin/colleges", collegeRoute);
app.use("/api/v1/admin/leads", leadRoute);





app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
