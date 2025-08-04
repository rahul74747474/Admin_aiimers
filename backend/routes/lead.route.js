import express from "express";
import { getLeads } from "../controllers/lead.controller.js";
import adminMiddleware from "../middlewares/admin.mid.js";

const router = express.Router();

router.get("/", adminMiddleware, getLeads);

export default router;