import { Router } from "express";
import { createPost, getAllPosts,updatePost,deletePost } from "../controllers/post.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

// Public route — get all posts
router.route("/").get(getAllPosts);

// Private route — create a new post
router
  .route("/")
  .post(
    verifyJWT, // must be logged in
    upload.fields([{ name: "image", maxCount: 1 }]), // optional post image
    createPost
  );


  // Update & Delete
router
  .route("/:postId")
  .put(
    verifyJWT,
    upload.fields([{ name: "image", maxCount: 1 }]),
    updatePost
  )
  .delete(verifyJWT, deletePost);

export default router;
