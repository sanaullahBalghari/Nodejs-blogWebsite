// src/utils/apiServer.js
import axios from "axios";
import toast from "react-hot-toast";

// ✅ Base URL Configuration
const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

// ✅ Toast Helper
const showToast = (type, message) => {
  if (type === "success") toast.success(message);
  if (type === "error") toast.error(message);
  if (type === "info") toast(message);
  if (type === "warning") toast(message, { icon: "⚠️" });
};

/**
 * 🚀 Centralized API Handler
 * 
 * ⚠️ DO NOT MODIFY THIS FILE - It's designed to be stable and reusable
 * Update apiRoutes.js for new endpoints instead
 * 
 * @param {string} method - HTTP method ("get" | "post" | "put" | "patch" | "delete")
 * @param {string} api - API endpoint path (e.g., "/api/users/register")
 * @param {object} data - Request payload or query params
 * @param {object} options - Configuration options
 *   @param {boolean} [options.tokenRequired=false] - Attach Authorization token
 *   @param {boolean} [options.showNotification=true] - Show success toast
 *   @param {boolean} [options.showErrorNotification=true] - Show error toast
 *   @param {object} [options.headers={}] - Additional custom headers
 *   @param {boolean} [options.isFormData=false] - Handle multipart/form-data
 * @returns {Promise<object>} - API response data
 */
const apiServer = async (
  method = "get",
  api,
  data = {},
  {
    tokenRequired = false,
    showNotification = false,
    showErrorNotification = true,
    headers = {},
    isFormData = false,
  } = {}
) => {
  try {
    // ✅ Validate API path
    if (!api || typeof api !== "string") {
      throw new Error("Invalid API route provided to apiServer");
    }

    // ✅ Retrieve token from localStorage
    const storedData = localStorage.getItem("userData");
    const parsedData = storedData ? JSON.parse(storedData) : null;
    const accessToken = parsedData?.accessToken || null;

    // ✅ Construct full URL
    const finalUrl = `${baseURL}${api}`;

    // 🐛 Debug logs (only in development)
    if (import.meta.env.MODE === "development") {
      console.log("🛰️ API Request =>", {
        method: method.toUpperCase(),
        url: finalUrl,
        tokenAttached: tokenRequired && !!accessToken,
        payload: isFormData ? "FormData (check Network tab)" : data,
      });
    }

    // ✅ Configure Axios request
    const config = {
      method,
      url: finalUrl,
      headers: {
        ...headers,
      },
      withCredentials: true, // 🔑 Important for cookies (accessToken & refreshToken)
    };

    // ✅ Set Content-Type only if not FormData (axios handles FormData automatically)
    if (!isFormData) {
      config.headers["Content-Type"] = "application/json";
    }

    // ✅ Attach Authorization token if required
    if (tokenRequired && accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    // ✅ Attach data based on HTTP method
    if (["post", "put", "patch"].includes(method.toLowerCase())) {
      config.data = data;
    } else if (["get", "delete"].includes(method.toLowerCase())) {
      config.params = data;
    }

    // ✅ Execute API call
    const response = await axios(config);

    // ✅ Extract response based on your backend structure
    const responseData = response.data;

    // ✅ Show success notification
    if (showNotification && responseData?.message) {
      showToast("success", responseData.message);
    }

    // ✅ Debug response (only in development)
    if (import.meta.env.MODE === "development") {
      console.log("✅ API Response =>", {
        status: response.status,
        success: responseData?.success,
        message: responseData?.message,
        data: responseData?.data,
      });
    }

    // ✅ Return the complete response object (matches your ApiResponse structure)
    return responseData;

  } catch (error) {
    // ❌ Error handling
    let errorMessage = "An unexpected error occurred. Please try again.";
    let statusCode = 500;

    if (error.response) {
      // Server responded with error (matches your ApiError structure)
      const responseData = error.response.data;
      statusCode = error.response.status;

      // ✅ Extract error message from backend ApiError structure
      errorMessage =
        responseData?.message ||
        responseData?.errors?.[0] ||
        `Error: ${error.response.status} - ${error.response.statusText}`;

      // Handle specific HTTP status codes
      if (statusCode === 401) {
        errorMessage = responseData?.message || "Unauthorized. Please login again.";
        
        // Clear localStorage and redirect to login
        localStorage.removeItem("userData");
        localStorage.removeItem("currentUser");
        
        // Small delay to show error message before redirect
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      } else if (statusCode === 403) {
        errorMessage = responseData?.message || "Access forbidden. You don't have permission.";
      } else if (statusCode === 404) {
        errorMessage = responseData?.message || "Resource not found.";
      } else if (statusCode === 409) {
        // ✅ IMPORTANT: Extract the actual message for 409 conflicts
        errorMessage = responseData?.message || "Resource already exists.";
      } else if (statusCode === 500) {
        errorMessage = responseData?.message || "Server error. Please try again later.";
      }
    } else if (error.request) {
      // Request made but no response received
      errorMessage = "No response from server. Check your internet connection.";
    } else {
      // Error in setting up request
      errorMessage = error.message || errorMessage;
    }

    // ✅ Show error notification if enabled
    if (showErrorNotification) {
      showToast("error", errorMessage);
    }

    // 🐛 Debug error logs (only in development)
    if (import.meta.env.MODE === "development") {
      console.error("❌ API Error =>", {
        endpoint: api,
        statusCode,
        message: errorMessage,
        fullError: error.response?.data || error.message,
      });
    }

    // ✅ FIXED: Create a new error object with the extracted message
    // This ensures the error message is accessible in catch blocks
    const customError = new Error(errorMessage);
    customError.response = error.response; // Preserve original response
    customError.statusCode = statusCode;
    customError.originalError = error;

    // ❌ Throw the custom error with proper message
    throw customError;
  }
};

export default apiServer;