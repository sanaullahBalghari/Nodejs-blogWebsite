import React, { useState, createContext, useContext, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import {mockPosts, mockUsers} from '../utils/mockData.js'
import HeroSection from '../components/HeroSection.jsx';
import PostCard from '../components/PostCard.jsx';
import { Search, Moon, Sun, Menu, X, Heart, MessageCircle, Calendar, User, Edit, Trash2, LogOut, PenTool, Home, TrendingUp, Filter, ChevronLeft, ChevronRight, Upload, Eye, EyeOff, Check } from 'lucide-react';
// Home Page Component
function HomePage({ setCurrentPage, setSelectedPost, searchQuery }) {
  const { isDark } = useTheme();
  const [posts, setPosts] = useState(mockPosts);
  const [filteredPosts, setFilteredPosts] = useState(mockPosts);
  const [authorFilter, setAuthorFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPageNum] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    let result = [...posts];

    // Search filter
    if (searchQuery) {
      result = result.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Author filter
    if (authorFilter !== 'all') {
      result = result.filter(post => post.author.username === authorFilter);
    }

    // Sort
    if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else {
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    setFilteredPosts(result);
    setCurrentPageNum(1);
  }, [searchQuery, authorFilter, sortBy, posts]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const featuredPost = posts[0];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <HeroSection setCurrentPage={setCurrentPage} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Post */}
        <div className="mb-12">
          <h2 className={`text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Featured Post</h2>
          <div className={`rounded-2xl overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-2xl hover:shadow-3xl transition-all duration-300`}>
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-64 md:h-auto">
                <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center space-x-3 mb-4">
                  <img src={featuredPost.author.avatar} alt={featuredPost.author.fullName} className="w-12 h-12 rounded-full" />
                  <div>
                    <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{featuredPost.author.fullName}</p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{featuredPost.createdAt}</p>
                  </div>
                </div>
                <h3 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>{featuredPost.title}</h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-6 line-clamp-4`}>{featuredPost.content}</p>
                <button onClick={() => { setSelectedPost(featuredPost); setCurrentPage('postDetail'); }} className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition w-fit">
                  Read Full Article
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Sort */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Recent Posts</h2>
          <div className="flex flex-wrap gap-4">
            <select value={authorFilter} onChange={(e) => setAuthorFilter(e.target.value)} className={`px-4 py-2 rounded-lg ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} border ${isDark ? 'border-gray-700' : 'border-gray-300'}`}>
              <option value="all">All Authors</option>
              {mockUsers.map(user => (
                <option key={user.id} value={user.username}>{user.fullName}</option>
              ))}
            </select>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={`px-4 py-2 rounded-lg ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} border ${isDark ? 'border-gray-700' : 'border-gray-300'}`}>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Posts Grid */}
        {currentPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {currentPosts.map(post => (
              <PostCard key={post.id} post={post} setCurrentPage={setCurrentPage} setSelectedPost={setSelectedPost} />
            ))}
          </div>
        ) : (
          <div className={`text-center py-20 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            <p className="text-xl">No posts found</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <button onClick={() => setCurrentPageNum(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className={`p-2 rounded-lg ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''} ${isDark ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-gray-900 hover:bg-gray-100'}`}>
              <ChevronLeft className="w-5 h-5" />
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button key={i} onClick={() => setCurrentPageNum(i + 1)} className={`px-4 py-2 rounded-lg ${currentPage === i + 1 ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' : isDark ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-gray-900 hover:bg-gray-100'}`}>
                {i + 1}
              </button>
            ))}
            <button onClick={() => setCurrentPageNum(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className={`p-2 rounded-lg ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''} ${isDark ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-gray-900 hover:bg-gray-100'}`}>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;