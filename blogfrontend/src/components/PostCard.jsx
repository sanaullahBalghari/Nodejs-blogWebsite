import React, { useState, useEffect } from 'react';
import { Search, Moon, Sun, Menu, X, Heart, MessageCircle, Calendar, User, Edit, Trash2, LogOut, PenTool, Home, TrendingUp, Filter, ChevronLeft, ChevronRight, Upload, Eye, EyeOff, Check } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
// Post Card Component
function PostCard({ post, setCurrentPage, setSelectedPost }) {
  const { isDark } = useTheme();
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className={`rounded-xl overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}>
      <div className="relative h-48 overflow-hidden cursor-pointer" onClick={() => { setSelectedPost(post); setCurrentPage('postDetail'); }}>
        <img src={post.image} alt={post.title} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <img src={post.author.avatar} alt={post.author.fullName} className="w-10 h-10 rounded-full" />
          <div>
            <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{post.author.fullName}</p>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{post.createdAt}</p>
          </div>
        </div>
        <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'} cursor-pointer hover:text-blue-500 transition`} onClick={() => { setSelectedPost(post); setCurrentPage('postDetail'); }}>
          {post.title}
        </h3>
        <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4 line-clamp-3`}>
          {post.content}
        </p>
        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
          <div className="flex items-center space-x-4">
            <button onClick={() => setIsLiked(!isLiked)} className={`flex items-center space-x-1 ${isLiked ? 'text-red-500' : isDark ? 'text-gray-400' : 'text-gray-500'} hover:text-red-500 transition`}>
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              <span>{post.likes + (isLiked ? 1 : 0)}</span>
            </button>
            <button className={`flex items-center space-x-1 ${isDark ? 'text-gray-400' : 'text-gray-500'} hover:text-blue-500 transition`}>
              <MessageCircle className="w-5 h-5" />
              <span>{post.comments}</span>
            </button>
          </div>
          <button onClick={() => { setSelectedPost(post); setCurrentPage('postDetail'); }} className="text-blue-500 hover:text-blue-600 font-semibold">
            Read More →
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostCard;