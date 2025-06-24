import express from "express";
import { protectRoute} from "../middleware/auth.middleware.js";
import { getStreamToken } from "../controllers/chat.controller.js";

const router = express.Router();

//apply auth middleware  to all routes
router.get("/token", protectRoute, getStreamToken)

export default router;