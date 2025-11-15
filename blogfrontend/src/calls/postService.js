import apiServer from "../utils/apiServer.js";
import {POST_ROUTES} from "../utils/apiRoutes.js";

// -------------------------------------------
// 📌 Get all posts (search, filter, pagination)
// -------------------------------------------
export const fetchAllPosts = async (query = {}) => {
  return await apiServer("get", POST_ROUTES.GET_ALL_POSTS, query, {
    tokenRequired: false, // public API
    showNotification: false, 
  });
};

// -------------------------------------------
// 📌 Get single post by ID
// -------------------------------------------
export const fetchPostById = async (postId) => {
  return await apiServer("get", POST_ROUTES.GET_POST_BY_ID(postId), {}, {
    tokenRequired: false,
    showNotification: false,
  });
};

// -------------------------------------------
// 📌 Create new post (multipart/form-data)
// -------------------------------------------
export const createPost = async (formData) => {
  return await apiServer("post", POST_ROUTES.CREATE_POST, formData, {
    tokenRequired: true,
    isFormData: true,
    showNotification: true,
  });
};

// -------------------------------------------
// 📌 Update post
// -------------------------------------------
export const updatePost = async (postId, formData) => {
  return await apiServer("put", POST_ROUTES.UPDATE_POST(postId), formData, {
    tokenRequired: true,
    isFormData: true,
    showNotification: true,
  });
};

// -------------------------------------------
// 📌 Delete post
// -------------------------------------------
export const deletePost = async (postId) => {
  return await apiServer("delete", POST_ROUTES.DELETE_POST(postId), {}, {
    tokenRequired: true,
    showNotification: true,
  });
};
