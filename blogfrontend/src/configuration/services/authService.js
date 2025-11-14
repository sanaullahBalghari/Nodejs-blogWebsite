// src/services/authService.js
import apiServer from "../../utils/apiServer.js";
import { AUTH_ROUTES } from "../../utils/apiRoutes.js";

/**
 * 🔐 Authentication Service
 * 
 * All authentication-related API calls
 * Matches backend structure perfectly
 */

/**
 * Register new user
 * @param {object} userData - User registration data
 *   @param {string} userData.username - Username (unique)
 *   @param {string} userData.fullName - Full name
 *   @param {string} userData.email - Email address
 *   @param {string} userData.password - Password
 *   @param {File} userData.avatar - Avatar image file (required)
 * @returns {Promise<object>} - Response: { statusCode, data: { user }, message, success }
 */
export const registerUser = async (userData) => {
  try {
    // ✅ Create FormData for multipart/form-data
    const formData = new FormData();
    formData.append("username", userData.username);
    formData.append("fullName", userData.fullName);
    formData.append("email", userData.email);
    formData.append("password", userData.password);

    // ✅ Avatar is required (matches backend validation)
    if (!userData.avatar) {
      throw new Error("Avatar is required");
    }
    formData.append("avatar", userData.avatar);

    // ✅ Call API
    const response = await apiServer("post", AUTH_ROUTES.REGISTER, formData, {
      tokenRequired: false,
      showNotification: true,
      isFormData: true,
    });

    return response;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
};

/**
 * Login user
 * @param {object} credentials - Login credentials
 *   @param {string} credentials.email - Email address (optional if username provided)
 *   @param {string} credentials.username - Username (optional if email provided)
 *   @param {string} credentials.password - Password (required)
 * @returns {Promise<object>} - Response: { 
 *   statusCode, 
 *   data: { user, accessToken, refreshToken }, 
 *   message, 
 *   success 
 * }
 * 
 * Note: Backend sets httpOnly cookies for accessToken & refreshToken
 * AND returns them in response body
 */
export const loginUser = async (credentials) => {
  try {
    // ✅ Validate input (at least username or email required)
    if (!credentials.username && !credentials.email) {
      throw new Error("Username or email is required");
    }

    if (!credentials.password) {
      throw new Error("Password is required");
    }

    // ✅ Call API
    const response = await apiServer("post", AUTH_ROUTES.LOGIN, credentials, {
      tokenRequired: false,
      showNotification: true,
    });

    // ✅ Store tokens in localStorage (backup to cookies)
    if (response.success && response.data) {
      const userData = {
        user: response.data.user,
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      };

      localStorage.setItem("userData", JSON.stringify(userData));
      
      // Also store current user separately for easy access
      localStorage.setItem("currentUser", JSON.stringify(response.data.user));
    }

    return response;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

/**
 * Logout user
 * @returns {Promise<object>} - Response: { statusCode, data: {}, message, success }
 * 
 * Note: Backend clears httpOnly cookies and removes refreshToken from DB
 */
export const logoutUser = async () => {
  try {
    // ✅ Call API (requires authentication)
    const response = await apiServer("post", AUTH_ROUTES.LOGOUT, {}, {
      tokenRequired: true,
      showNotification: true,
    });

    // ✅ Clear localStorage
    localStorage.removeItem("userData");
    localStorage.removeItem("currentUser");

    return response;
  } catch (error) {
    console.error("Logout failed:", error);
    
    // ✅ Even if API fails, clear local data
    localStorage.removeItem("userData");
    localStorage.removeItem("currentUser");
    
    throw error;
  }
};

/**
 * Get current authenticated user
 * (Implement this if you add a /me endpoint on backend)
 * @returns {Promise<object>} - Current user data
 */
export const getCurrentUser = async () => {
  try {
    const response = await apiServer("get", AUTH_ROUTES.GET_CURRENT_USER, {}, {
      tokenRequired: true,
      showNotification: false,
    });

    return response.data;
  } catch (error) {
    console.error("Failed to get current user:", error);
    throw error;
  }
};

/**
 * Refresh access token
 * (Implement this if you add a refresh endpoint on backend)
 * @returns {Promise<object>} - New access token
 */
export const refreshAccessToken = async () => {
  try {
    const response = await apiServer("post", AUTH_ROUTES.REFRESH_TOKEN, {}, {
      tokenRequired: false,
      showNotification: false,
    });

    // ✅ Update tokens in localStorage
    if (response.success && response.data) {
      const storedData = localStorage.getItem("userData");
      const userData = storedData ? JSON.parse(storedData) : {};
      
      userData.accessToken = response.data.accessToken;
      
      if (response.data.refreshToken) {
        userData.refreshToken = response.data.refreshToken;
      }

      localStorage.setItem("userData", JSON.stringify(userData));
    }

    return response;
  } catch (error) {
    console.error("Token refresh failed:", error);
    throw error;
  }
};

/**
 * Check if user is authenticated
 * @returns {boolean} - True if user has valid token
 */
export const isAuthenticated = () => {
  const userData = localStorage.getItem("userData");
  if (!userData) return false;

  try {
    const parsed = JSON.parse(userData);
    return !!parsed.accessToken;
  } catch {
    return false;
  }
};

/**
 * Get stored user data
 * @returns {object|null} - User data or null
 */
export const getStoredUser = () => {
  const userData = localStorage.getItem("userData");
  if (!userData) return null;

  try {
    return JSON.parse(userData);
  } catch {
    return null;
  }
};