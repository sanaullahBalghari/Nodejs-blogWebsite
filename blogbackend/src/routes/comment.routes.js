import { Router } from "express";
import { addComment, getPostComments } from "../controllers/comment.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

// 📮 Add comment (auth required)
// 📜 Get all comments for a post (public)
router
  .route("/:postId/comments")
  .post(verifyJWT, addComment)
  .get(getPostComments);

export default router;
