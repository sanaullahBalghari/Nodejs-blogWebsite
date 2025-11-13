import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Post } from "../models/post.models.js";

// Like / Unlike Post
export const toggleLike = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const userId = req.user._id;

  const post = await Post.findById(postId);
  if (!post) throw new ApiError(404, "Post not found");

  const isLiked = post.likes?.includes(userId);

  if (isLiked) {
    // unlike
    post.likes = post.likes.filter(id => id.toString() !== userId.toString());
  } else {
    // like
    post.likes.push(userId);
  }

  await post.save();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { likes: post.likes.length, liked: !isLiked },
        isLiked ? "Post unliked" : "Post liked"
      )
    );
});
