import express from "express";
import { getColleges, createCollege , deleteCollege } from "../controllers/college.controller.js";
import adminMiddleware from "../middlewares/admin.mid.js";

const router = express.Router();

router.get("/",adminMiddleware, getColleges);
router.post("/create", adminMiddleware, createCollege);
router.delete("/delete/:id", adminMiddleware, deleteCollege);

export default router;