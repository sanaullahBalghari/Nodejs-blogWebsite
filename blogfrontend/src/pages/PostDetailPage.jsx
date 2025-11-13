
import React, { useState, createContext, useContext, useEffect } from 'react';
import { Search, Moon, Sun, Menu, X, Heart, MessageCircle, Calendar, User, Edit, Trash2, LogOut, PenTool, Home, TrendingUp, Filter, ChevronLeft, ChevronRight, Upload, Eye, EyeOff, Check } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { mockPosts, mockUsers } from '../utils/mockData';
// Post Detail Page
function PostDetailPage({ post, setCurrentPage, setSelectedPost }) {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    { id: 1, user: mockUsers[1], text: 'Great article! Very informative.', createdAt: '2024-11-11' },
    { id: 2, user: mockUsers[2], text: 'Thanks for sharing this. Really helpful!', createdAt: '2024-11-12' }
  ]);

  const handleAddComment = (e) => {
    e.preventDefault();
    if (comment.trim() && user) {
      setComments([...comments, {
        id: comments.length + 1,
        user: user,
        text: comment,
        createdAt: new Date().toISOString().split('T')[0]
      }]);
      setComment('');
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} py-12`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button onClick={() => setCurrentPage('home')} className={`mb-6 flex items-center space-x-2 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
          <ChevronLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </button>

        {/* Post Content */}
        <article className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl overflow-hidden`}>
          <img src={post.image} alt={post.title} className="w-full h-96 object-cover" />
          
          <div className="p-8">
            {/* Author Info */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <img src={post.author.avatar} alt={post.author.fullName} className="w-16 h-16 rounded-full" />
                <div>
                  <p className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>{post.author.fullName}</p>
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>{post.createdAt}</span>
                  </div>
                </div>
              </div>
              {user && user.id === post.author.id && (
                <div className="flex space-x-2">
                  <button onClick={() => { setSelectedPost(post); setCurrentPage('edit'); }} className={`p-2 rounded-lg ${isDark ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}>
                    <Edit className="w-5 h-5" />
                  </button>
                  <button className={`p-2 rounded-lg ${isDark ? 'bg-red-900 text-red-200 hover:bg-red-800' : 'bg-red-100 text-red-600 hover:bg-red-200'}`}>
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Title */}
            <h1 className={`text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>{post.title}</h1>

            {/* Content */}
            <div className={`prose prose-lg max-w-none mb-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <p>{post.content}</p>
              <p className="mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
              <p className="mt-4">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>

            {/* Like Button */}
            <div className="flex items-center space-x-4 pt-6 border-t border-gray-700">
              <button onClick={() => setIsLiked(!isLiked)} className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition ${isLiked ? 'bg-red-500 text-white' : isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                <span className="font-semibold">{post.likes + (isLiked ? 1 : 0)} Likes</span>
              </button>
            </div>
          </div>
        </article>

        {/* Comments Section */}
        <div className={`mt-8 ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8`}>
          <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Comments ({comments.length})
          </h2>

          {/* Add Comment Form */}
          {user ? (
            <form onSubmit={handleAddComment} className="mb-8">
              <div className="flex space-x-4">
                <img src={user.avatar} alt={user.fullName} className="w-12 h-12 rounded-full" />
                <div className="flex-1">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment..."
                    rows="3"
                    className={`w-full px-4 py-3 rounded-lg ${isDark ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-gray-100 text-gray-900 placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  <button type="submit" className="mt-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition">
                    Post Comment
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className={`mb-8 p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                Please <button onClick={() => setCurrentPage('login')} className="text-blue-500 hover:underline">login</button> to comment
              </p>
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-6">
            {comments.map(c => (
              <div key={c.id} className="flex space-x-4">
                <img src={c.user.avatar} alt={c.user.fullName} className="w-12 h-12 rounded-full" />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{c.user.fullName}</p>
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>• {c.createdAt}</span>
                  </div>
                  <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>{c.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetailPage;