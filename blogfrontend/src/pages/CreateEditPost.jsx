import React, { useState, useEffect } from "react";
import { ChevronLeft, Upload, X } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import { createPost, updatePost } from "../calls/postService.js";

console.log("CREATE PAGE LOADED");

function CreateEditPostPage({ setCurrentPage, editPost = null }) {
  console.log("CREATE PAGE LOADED");

  const { isDark } = useTheme();
  const { user } = useAuth();

  const [title, setTitle] = useState(editPost?.title || "");
  const [content, setContent] = useState(editPost?.content || "");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    editPost?.image || ""
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);

      if (image) {
        formData.append("image", image);
      }

      if (editPost) {
        // -------------------------------
        // UPDATE POST
        // -------------------------------
        await updatePost(editPost._id, formData);

        alert("Post updated successfully!");
      } else {
        // -------------------------------
        // CREATE POST
        // -------------------------------
        await createPost(formData);

        alert("Post created successfully!");
      }

      setCurrentPage("home");
    } catch (error) {
      console.log(error);
      alert("Error saving post");
    }
  };

  if (!user) {
    return (
      <div
        className={`min-h-screen ${
          isDark ? "bg-gray-900" : "bg-gray-50"
        } flex items-center justify-center`}
      >
        <div
          className={`text-center ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          <p className="text-xl mb-4">Please login to create posts</p>
          <button
            onClick={() => setCurrentPage("login")}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${
        isDark ? "bg-gray-900" : "bg-gray-50"
      } py-12`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => setCurrentPage("home")}
          className={`mb-6 flex items-center space-x-2 ${
            isDark
              ? "text-gray-400 hover:text-white"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <div
          className={`${
            isDark ? "bg-gray-800" : "bg-white"
          } rounded-2xl shadow-xl p-8`}
        >
          <h1
            className={`text-3xl font-bold mb-8 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {editPost ? "Edit Post" : "Create New Post"}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter post title..."
                required
                className={`w-full px-4 py-3 rounded-lg ${
                  isDark
                    ? "bg-gray-700 text-white placeholder-gray-400"
                    : "bg-gray-100 text-gray-900 placeholder-gray-500"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            {/* Image Upload */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Cover Image
              </label>

              <div
                className={`border-2 border-dashed ${
                  isDark ? "border-gray-600" : "border-gray-300"
                } rounded-lg p-6 text-center`}
              >
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview("");
                        setImage(null);
                      }}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <div>
                    <Upload
                      className={`w-12 h-12 mx-auto mb-4 ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    />
                    <p
                      className={`mb-2 ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Click to upload or drag and drop
                    </p>
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />

                <label
                  htmlFor="image-upload"
                  className="mt-4 inline-block px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg cursor-pointer hover:opacity-90 transition"
                >
                  Choose File
                </label>
              </div>
            </div>

            {/* Content */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your post content..."
                rows="12"
                required
                className={`w-full px-4 py-3 rounded-lg ${
                  isDark
                    ? "bg-gray-700 text-white placeholder-gray-400"
                    : "bg-gray-100 text-gray-900 placeholder-gray-500"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            {/* Buttons */}
            <div className="flex space-x-4">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:opacity-90 transition"
              >
                {editPost ? "Update Post" : "Publish Post"}
              </button>

              <button
                type="button"
                onClick={() => setCurrentPage("home")}
                className={`px-6 py-3 rounded-lg ${
                  isDark
                    ? "bg-gray-700 text-white hover:bg-gray-600"
                    : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                }`}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateEditPostPage;
