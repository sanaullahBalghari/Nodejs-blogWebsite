import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import HeroSection from '../components/HeroSection.jsx';
import PostCard from '../components/PostCard.jsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchAllPosts } from '../calls/postService.js';

function HomePage({ setCurrentPage, setSelectedPost, searchQuery }) {
  const { isDark } = useTheme();

  // Backend states
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("newest");
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);

  const postsPerPage = 6;

  // Reset to page 1 when search query or sort changes
  useEffect(() => {
    setCurrentPageNum(1);
  }, [searchQuery, sortBy]);

  // Fetch posts when dependencies change
  useEffect(() => {
    fetchPosts();
  }, [searchQuery, sortBy, currentPageNum]);

  const fetchPosts = async () => {
    try {
      setLoading(true);

      const queryParams = {
        page: currentPageNum,
        limit: postsPerPage,
      };

      // Add search query if exists
      if (searchQuery && searchQuery.trim() !== "") {
        queryParams.search = searchQuery.trim();
      }

      // Add sorting - backend expects "oldest" or default (newest)
      // Add sorting - backend expects "oldest" or default (newest)
      // Add sorting - backend expects "oldest" or default (newest)
      // Add sorting - backend expects "oldest" or default (newest)
      // Add sorting - backend expects "oldest" or default (newest)
      // Add sorting - backend expects "oldest" or default (newest)
      if (sortBy === "oldest") {
        queryParams.sortBy = "oldest";
      }
      // For "newest", we don't send sortBy param as backend defaults to newest

      const response = await fetchAllPosts(queryParams);

      // Backend returns: { posts, totalPosts, currentPage, totalPages }
      if (response && response.data) {
        setPosts(response.data.posts || []);
        setTotalPosts(response.data.totalPosts || 0);
        setTotalPages(response.data.totalPages || 1);
      }
      
      setLoading(false);
    } catch (error) {
      console.log("Error loading posts:", error);
      setPosts([]);
      setLoading(false);
    }
  };

  const featuredPost = posts.length > 0 ? posts[0] : null;

  return (
    <div className={`min-h-screen ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
      <HeroSection setCurrentPage={setCurrentPage} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Filters & Sort Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            {loading ? "Loading..." : `${totalPosts} posts found`}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3">
            <label className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              Sort by:
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`px-4 py-2 rounded-lg border ${
                isDark 
                  ? "bg-gray-800 text-white border-gray-700" 
                  : "bg-white text-gray-900 border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Featured Post */}
        {!loading && featuredPost && (
          <div className="mb-12">
            <h2 className={`text-3xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>
              {searchQuery ? "Top Result" : "Latest Post"}
            </h2>

            <div className={`rounded-2xl overflow-hidden ${isDark ? "bg-gray-800" : "bg-white"} shadow-2xl`}>
              <div className="grid md:grid-cols-2">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="w-full h-60 md:h-80 object-cover" 
                />

                <div className="p-8">
                  <h3 className={`text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
                    {featuredPost.title}
                  </h3>

                  <p className={`${isDark ? "text-gray-300" : "text-gray-700"} mb-6 line-clamp-4`}>
                    {featuredPost.content}
                  </p>

                  <button
                    onClick={() => {
                      setSelectedPost(featuredPost);
                      setCurrentPage("postDetail");
                    }}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Read Full Article
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recent Posts Title */}
        {!loading && posts.length > 1 && (
          <h2 className={`text-2xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>
            {searchQuery ? "More Results" : "Recent Posts"}
          </h2>
        )}

        {/* Posts Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-xl text-gray-500">Loading posts...</p>
            </div>
          </div>
        ) : posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {posts.slice(1).map((post) => (
              <PostCard
                key={post._id}
                post={post}
                setCurrentPage={setCurrentPage}
                setSelectedPost={setSelectedPost}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-400 mb-2">No posts found</p>
            {searchQuery && (
              <p className="text-sm text-gray-500">
                Try adjusting your search terms
              </p>
            )}
          </div>
        )}

        {/* Pagination */}
        {!loading && posts.length > 0 && totalPages > 1 && (
          <div className="flex justify-center items-center space-x-4 mt-10">
            <button
              onClick={() => setCurrentPageNum((prev) => Math.max(prev - 1, 1))}
              disabled={currentPageNum === 1}
              className={`px-3 py-2 rounded-lg transition-colors ${
                currentPageNum === 1
                  ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                  : "bg-gray-700 hover:bg-gray-600 text-white"
              }`}
            >
              <ChevronLeft />
            </button>

            <span className={`${isDark ? "text-white" : "text-gray-900"} font-medium`}>
              Page {currentPageNum} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPageNum((prev) => prev + 1)}
              disabled={currentPageNum >= totalPages}
              className={`px-3 py-2 rounded-lg transition-colors ${
                currentPageNum >= totalPages
                  ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                  : "bg-gray-700 hover:bg-gray-600 text-white"
              }`}
            >
              <ChevronRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;