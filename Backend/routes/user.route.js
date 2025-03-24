import express from "express";
import { clerkWebhook } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", clerkWebhook);

export default router;
