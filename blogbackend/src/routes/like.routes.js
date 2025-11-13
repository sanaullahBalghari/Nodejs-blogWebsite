import { Router } from "express";
import { toggleLike } from "../controllers/like.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

// ❤️ Toggle like/unlike on a post
router.route("/:postId/like").post(verifyJWT, toggleLike);

export default router;
