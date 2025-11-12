import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import { Post } from "../models/post.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import fs from "fs";

export const createPost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  // Validation
  if (!title?.trim() || !content?.trim()) {
    throw new ApiError(400, "Title and content are required");
  }

  // Check for image (optional)
  const imageLocalPath = req.files?.image?.[0]?.path;

  let uploadedImageUrl = "";
  if (imageLocalPath) {
    const uploadResult = await uploadOnCloudinary(imageLocalPath);
    uploadedImageUrl = uploadResult?.url || "";
  }

  // Create post
  const newPost = await Post.create({
    title,
    content,
    image: uploadedImageUrl,
    author: req.user._id, // from verifyJWT middleware
  });

  const createdPost = await Post.findById(newPost._id).populate(
    "author",
    "username fullName avatar"
  );

  return res
    .status(201)
    .json(new ApiResponse(201, createdPost, "Post created successfully"));
});


// 🧩 Get All Posts (with search, author filter, pagination, sorting)
export const getAllPosts = asyncHandler(async (req, res) => {
  const filter = {};

  // 1️⃣ Search by title or content
  if (req.query.search) {
    const searchRegex = new RegExp(req.query.search, "i");
    filter.$or = [
      { title: { $regex: searchRegex } },
      { content: { $regex: searchRegex } },
    ];
  }

  // 2️⃣ Filter by author (username)
  if (req.query.author) {
    const author = await User.findOne({ username: req.query.author });
    if (author) {
      filter.author = author._id;
    } else {
      throw new ApiError(404, "Author not found");
    }
  }

  // 3️⃣ Sorting (default: newest first)
  let sortOption = { createdAt: -1 };
  if (req.query.sortBy === "oldest") sortOption = { createdAt: 1 };

  // 4️⃣ Pagination (default 6 posts per page)
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 6;
  const skip = (page - 1) * limit;

  // Fetch filtered, sorted, paginated posts
  const posts = await Post.find(filter)
    .populate("author", "username fullName avatar")
    .sort(sortOption)
    .skip(skip)
    .limit(limit);

  if (!posts.length) {
    throw new ApiError(404, "No posts found");
  }

  // Total count for pagination info
  const totalPosts = await Post.countDocuments(filter);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        posts,
        totalPosts,
        currentPage: page,
        totalPages: Math.ceil(totalPosts / limit),
      },
      "Posts fetched successfully"
    )
  );
});




/*
 Update a post (title, content, optional image)
 */
export const updatePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { title, content } = req.body;

  const post = await Post.findById(postId);
  if (!post) throw new ApiError(404, "Post not found");

  // Check if the logged-in user is the author
  if (post.author.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to update this post");
  }

  // If new image uploaded, upload to Cloudinary
  let updatedImageUrl = post.image;
  const imageLocalPath = req.files?.image?.[0]?.path;
  if (imageLocalPath) {
    const cloudResult = await uploadOnCloudinary(imageLocalPath);
    if (cloudResult?.url) {
      updatedImageUrl = cloudResult.url;
    }
  }

  post.title = title || post.title;
  post.content = content || post.content;
  post.image = updatedImageUrl;

  await post.save();

  const updatedPost = await Post.findById(post._id).populate(
    "author",
    "username fullName avatar"
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updatedPost, "Post updated successfully"));
});

/*
  Delete a post
 */
export const deletePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  const post = await Post.findById(postId);
  if (!post) throw new ApiError(404, "Post not found");

  // Authorization check
  if (post.author.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to delete this post");
  }

  await Post.findByIdAndDelete(postId);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Post deleted successfully"));
});
