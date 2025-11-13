
import React, { useState, useEffect } from 'react';
import { Search, Moon, Sun, Menu, X, Heart, MessageCircle, Calendar, User, Edit, Trash2, LogOut, PenTool, Home, TrendingUp, Filter, ChevronLeft, ChevronRight, Upload, Eye, EyeOff, Check } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
// Footer Component
function Footer() {
  const { isDark } = useTheme();

  return (
    <footer className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-t mt-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <PenTool className="w-6 h-6 text-white" />
              </div>
              <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>ModernBlog</span>
            </div>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
              A modern platform for sharing ideas, stories, and knowledge with the world.
            </p>
            <div className="flex space-x-4">
              <button className={`w-10 h-10 rounded-full ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} flex items-center justify-center`}>
                <span className={isDark ? 'text-white' : 'text-gray-900'}>𝕏</span>
              </button>
              <button className={`w-10 h-10 rounded-full ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} flex items-center justify-center`}>
                <span className={isDark ? 'text-white' : 'text-gray-900'}>in</span>
              </button>
              <button className={`w-10 h-10 rounded-full ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} flex items-center justify-center`}>
                <span className={isDark ? 'text-white' : 'text-gray-900'}>f</span>
              </button>
            </div>
          </div>

          <div>
            <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Quick Links</h3>
            <ul className="space-y-2">
              <li><button className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>About Us</button></li>
              <li><button className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Contact</button></li>
              <li><button className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Privacy Policy</button></li>
              <li><button className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Terms of Service</button></li>
            </ul>
          </div>

          <div>
            <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Categories</h3>
            <ul className="space-y-2">
              <li><button className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Technology</button></li>
              <li><button className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Design</button></li>
              <li><button className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Development</button></li>
              <li><button className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Business</button></li>
            </ul>
          </div>
        </div>

        <div className={`mt-12 pt-8 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'} text-center`}>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            © 2024 ModernBlog. All rights reserved. Built with ❤️ using React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;