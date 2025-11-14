// src/utils/apiRoutes.js

/**
 * 🗺️ API Routes Configuration
 * 
 * All API endpoints are centralized here for easy management.
 * Update endpoints here instead of modifying apiServer.js
 * 
 * Backend Structure:
 * - Auth: /api/users/register, /api/users/login, /api/users/logout
 * - Posts: /api/posts
 * - Comments: /api/posts/:postId/comments
 * - Likes: /api/posts/:postId/like
 */

// ============================================
// 🔐 AUTHENTICATION ROUTES
// ============================================
export const AUTH_ROUTES = {
  REGISTER: "/api/users/register",
  LOGIN: "/api/users/login",
  LOGOUT: "/api/users/logout",
  GET_CURRENT_USER: "/api/users/me", // If you have this endpoint
  REFRESH_TOKEN: "/api/users/refresh-token", // If you implement this
};

// ============================================
// 📝 POST ROUTES
// ============================================
export const POST_ROUTES = {
  // Get all posts (supports query params: page, limit, search, author, sortBy)
  GET_ALL_POSTS: "/api/posts",
  
  // Get single post by ID
  GET_POST_BY_ID: (postId) => `/api/posts/${postId}`,
  
  // Create new post (requires auth)
  CREATE_POST: "/api/posts",
  
  // Update post (requires auth + ownership)
  UPDATE_POST: (postId) => `/api/posts/${postId}`,
  
  // Delete post (requires auth + ownership)
  DELETE_POST: (postId) => `/api/posts/${postId}`,
  
  // Search posts (if you have separate search endpoint)
  SEARCH_POSTS: "/api/posts/search",
  
  // Get posts by specific user (if you have this endpoint)
  GET_USER_POSTS: (username) => `/api/posts/user/${username}`,
};

// ============================================
// 💬 COMMENT ROUTES
// ============================================
export const COMMENT_ROUTES = {
  // Get all comments for a post (public)
  GET_COMMENTS: (postId) => `/api/posts/${postId}/comments`,
  
  // Add comment to a post (requires auth)
  ADD_COMMENT: (postId) => `/api/posts/${postId}/comments`,
  
  // Update comment (if you implement this)
  UPDATE_COMMENT: (postId, commentId) => `/api/posts/${postId}/comments/${commentId}`,
  
  // Delete comment (if you implement this)
  DELETE_COMMENT: (postId, commentId) => `/api/posts/${postId}/comments/${commentId}`,
};

// ============================================
// ❤️ LIKE ROUTES
// ============================================
export const LIKE_ROUTES = {
  // Toggle like/unlike on a post (requires auth)
  TOGGLE_LIKE: (postId) => `/api/posts/${postId}/like`,
  
  // Get all likes for a post (if you have this endpoint)
  GET_POST_LIKES: (postId) => `/api/posts/${postId}/likes`,
};

// ============================================
// 👤 USER/PROFILE ROUTES (if you implement these)
// ============================================
export const USER_ROUTES = {
  // Get user profile by username
  GET_USER_PROFILE: (username) => `/api/users/profile/${username}`,
  
  // Update user profile (requires auth)
  UPDATE_PROFILE: "/api/users/profile",
  
  // Update avatar (requires auth)
  UPDATE_AVATAR: "/api/users/avatar",
  
  // Get user statistics
  GET_USER_STATS: (username) => `/api/users/${username}/stats`,
};

// ============================================
// 🔍 HELPER FUNCTIONS
// ============================================

/**
 * Build query string from params object
 * @param {object} params - Query parameters
 * @returns {string} - Formatted query string
 * 
 * Example:
 * buildQueryString({ page: 1, limit: 10, search: "react" })
 * Returns: "?page=1&limit=10&search=react"
 */
export const buildQueryString = (params) => {
  if (!params || Object.keys(params).length === 0) return "";
  
  const queryString = Object.entries(params)
    .filter(([_, value]) => value !== null && value !== undefined && value !== "")
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join("&");
  
  return queryString ? `?${queryString}` : "";
};

/**
 * Get paginated posts route with filters
 * @param {object} filters - Filter options
 *   @param {number} [filters.page=1] - Page number
 *   @param {number} [filters.limit=10] - Posts per page
 *   @param {string} [filters.search=""] - Search query
 *   @param {string} [filters.author=""] - Filter by author username
 *   @param {string} [filters.sortBy="newest"] - Sort order (newest/oldest)
 * @returns {string} - Complete route with query params
 * 
 * Example:
 * getPaginatedPostsRoute({ page: 2, limit: 6, search: "react" })
 * Returns: "/api/posts?page=2&limit=6&search=react"
 */
export const getPaginatedPostsRoute = (filters = {}) => {
  const { 
    page = 1, 
    limit = 10, 
    search = "", 
    author = "", 
    sortBy = "newest" 
  } = filters;
  
  const queryParams = buildQueryString({ 
    page, 
    limit, 
    search, 
    author, 
    sortBy 
  });
  
  return `${POST_ROUTES.GET_ALL_POSTS}${queryParams}`;
};

/**
 * Get search posts route with query
 * @param {string} searchQuery - Search term
 * @param {object} options - Additional options
 * @returns {string} - Complete search route
 */
export const getSearchPostsRoute = (searchQuery, options = {}) => {
  const queryParams = buildQueryString({ 
    q: searchQuery, 
    ...options 
  });
  return `${POST_ROUTES.SEARCH_POSTS}${queryParams}`;
};

// ============================================
// 📌 EXPORT ALL ROUTES AS DEFAULT
// ============================================
export default {
  AUTH_ROUTES,
  POST_ROUTES,
  COMMENT_ROUTES,
  LIKE_ROUTES,
  USER_ROUTES,
  buildQueryString,
  getPaginatedPostsRoute,
  getSearchPostsRoute,
};