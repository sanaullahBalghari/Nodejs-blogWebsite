import { Router } from "express";
import { createPost, getAllPosts,updatePost,deletePost, getPostById } from "../controllers/post.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

// Public route — get all posts
router.route("/").get(getAllPosts);

// Private route — create a new post
router .route("/").post(verifyJWT, upload.fields([{ name: "image", maxCount: 1 }]),createPost);


  // Update & Delete
router.route("/:postId").put(verifyJWT,upload.fields([{ name: "image", maxCount: 1 }]),updatePost).delete(verifyJWT, deletePost);
router.route("/:id").get(getPostById)
export default router;
