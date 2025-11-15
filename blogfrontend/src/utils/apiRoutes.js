// src/utils/apiRoutes.js


// AUTHENTICATION ROUTES

export const AUTH_ROUTES = {
  REGISTER: "/api/v1/users/register",
  LOGIN: "/api/v1/users/login",
  LOGOUT: "/api/v1/users/logout",
  CURRENT_USER: "/api/v1/users/me", // If you have this endpoint
 
};


// POST ROUTES

export const POST_ROUTES = {
  GET_ALL_POSTS: "/api/v1/posts",
  GET_POST_BY_ID: (postId) => `/api/v1/posts/${postId}`,
  CREATE_POST: "/api/v1/posts",
  UPDATE_POST: (postId) => `/api/v1/posts/${postId}`,
  DELETE_POST: (postId) => `/api/v1/posts/${postId}`,
  
};


// COMMENT ROUTES

export const COMMENT_ROUTES = {
  GET_COMMENTS: (postId) => `/api/v1/comments/${postId}/comments`,
  ADD_COMMENT: (postId) => `/api/v1/comments/${postId}/comments`,

// later 
  UPDATE_COMMENT: (postId, commentId) => `/api/v1/comments/${postId}/comments/${commentId}`,
  DELETE_COMMENT: (postId, commentId) =>`/api/v1/comments/${postId}/comments/${commentId}`,
};


// Like Routes 
export const LIKE_ROUTES = {
  TOGGLE_LIKE: (postId) => `/api/v1/likes/${postId}/like`,

  // ❤️ Get all likes for a post (ONLY if you implement this later)
  GET_POST_LIKES: (postId) => `/api/v1/likes/${postId}/likes`,
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