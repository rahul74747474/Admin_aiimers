import express from "express";
import { getTestimonials, createTestimonial , deleteTestimonial} from "../controllers/testimonials.controller.js";
import adminMiddleware from "../middlewares/admin.mid.js";

const router = express.Router();

router.get("/",adminMiddleware, getTestimonials);
router.post("/create", adminMiddleware, createTestimonial);
router.delete("/delete/:id", adminMiddleware, deleteTestimonial);

export default router;
