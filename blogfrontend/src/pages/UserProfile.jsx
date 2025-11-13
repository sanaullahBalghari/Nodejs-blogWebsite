import React, { useState, createContext, useContext, useEffect } from 'react';
import { Search, Moon, Sun, Menu, X, Heart, MessageCircle, Calendar, User, Edit, Trash2, LogOut, PenTool, Home, TrendingUp, Filter, ChevronLeft, ChevronRight, Upload, Eye, EyeOff, Check } from 'lucide-react';

// User Profile Page
function UserProfilePage({ setCurrentPage, setSelectedPost, profileUser = null }) {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const displayUser = profileUser || user;
  const userPosts = mockPosts.filter(post => post.author.id === displayUser?.id);

  if (!displayUser) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className={`text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
          <p className="text-xl mb-4">Please login to view profile</p>
          <button onClick={() => setCurrentPage('login')} className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg">
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} py-12`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8 mb-8`}>
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            <img src={displayUser.avatar} alt={displayUser.fullName} className="w-32 h-32 rounded-full border-4 border-blue-500" />
            <div className="flex-1 text-center md:text-left">
              <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{displayUser.fullName}</h1>
              <p className={`text-lg mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>@{displayUser.username}</p>
              <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{displayUser.bio}</p>
              <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                <div>
                  <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{userPosts.length}</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Posts</p>
                </div>
                <div>
                  <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {userPosts.reduce((sum, post) => sum + post.likes, 0)}
                  </p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Total Likes</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User's Posts */}
        <div>
          <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {profileUser ? `Posts by ${profileUser.fullName}` : 'My Posts'}
          </h2>
          {userPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {userPosts.map(post => (
                <PostCard key={post.id} post={post} setCurrentPage={setCurrentPage} setSelectedPost={setSelectedPost} />
              ))}
            </div>
          ) : (
            <div className={`text-center py-20 ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl`}>
              <p className={`text-xl mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>No posts yet</p>
              {user && user.id === displayUser.id && (
                <button onClick={() => setCurrentPage('create')} className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg">
                  Create Your First Post
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfilePage;