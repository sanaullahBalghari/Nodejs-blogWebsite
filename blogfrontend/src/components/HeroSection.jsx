import React, { useState, createContext, useContext, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { Search, Moon, Sun, Menu, X, Heart, MessageCircle, Calendar, User, Edit, Trash2, LogOut, PenTool, Home, TrendingUp, Filter, ChevronLeft, ChevronRight, Upload, Eye, EyeOff, Check } from 'lucide-react';
// Hero Section Component
function HeroSection({ setCurrentPage }) {
  const { isDark } = useTheme();
  const { user } = useAuth();

  return (
    <div className={`relative overflow-hidden ${isDark ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Share Your <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Stories</span>
          </h1>
          <p className={`text-xl md:text-2xl mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Discover amazing content, connect with writers, and share your thoughts with the world
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
            <button 
  onClick={() => setCurrentPage('create')}
  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-lg font-semibold hover:opacity-90 transition shadow-lg"
>
  Start Writing
</button>

            ) : (
              <>
                <button onClick={() => setCurrentPage('register')} className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-lg font-semibold hover:opacity-90 transition shadow-lg">
                  Get Started
                </button>
                <button onClick={() => setCurrentPage('home')} className={`px-8 py-4 ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} rounded-lg text-lg font-semibold hover:opacity-90 transition shadow-lg`}>
                  Explore Blogs
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}

export default HeroSection;