import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Comment } from "../models/comment.model.js";
import { Post } from "../models/post.models.js";

// Add Comment
export const addComment = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const { postId } = req.params;

  if (!content?.trim()) {
    throw new ApiError(400, "Comment content is required");
  }

  const post = await Post.findById(postId);
  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  const comment = await Comment.create({
    content,
    author: req.user._id,
    post: postId,
  });

  const createdComment = await Comment.findById(comment._id)
    .populate("author", "username fullName avatar");

  return res
    .status(201)
    .json(new ApiResponse(201, createdComment, "Comment added successfully"));
});

// 📋 Get Comments for a Post
export const getPostComments = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  const comments = await Comment.find({ post: postId })
    .populate("author", "username fullName avatar")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, comments, "Comments fetched successfully"));
});
