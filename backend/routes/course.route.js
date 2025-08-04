import express from "express";
import {
  createSuccessStory,
  deleteSuccessStory,
  getSuccessStories,
} from "../controllers/course.controller.js";
import adminMiddleware from "../middlewares/admin.mid.js";

const router = express.Router();

// ✅ Route for creating a success story with file upload
router.post("/success", adminMiddleware, createSuccessStory);

router.delete("/success-stories/:id", adminMiddleware, deleteSuccessStory);
router.get("/success-stories", adminMiddleware, getSuccessStories);

export default router;
