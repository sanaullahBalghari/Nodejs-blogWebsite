// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, PenTool, Loader } from 'lucide-react';

function LoginPage({ setCurrentPage }) {
  const { isDark } = useTheme();
  const { login } = useAuth();
  
  // Form state
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: ''
  });
  
  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // ✅ Validate form before submission
  const validateForm = () => {
    const newErrors = {};

    // Email or username validation
    if (!formData.emailOrUsername.trim()) {
      newErrors.emailOrUsername = 'Email or username is required';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Determine if input is email or username
      const input = formData.emailOrUsername.trim();
      const isEmail = input.includes('@');

      // Prepare credentials based on input type
      const credentials = {
        password: formData.password,
        ...(isEmail ? { email: input.toLowerCase() } : { username: input })
      };

      console.log('🔄 Logging in...', {
        type: isEmail ? 'email' : 'username',
        value: input
      });

      // Call login function from AuthContext
      const response = await login(credentials);

      console.log('✅ Login successful:', response);

      // Save remember me preference
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('rememberMe');
      }

      // Redirect to home page after successful login
      setTimeout(() => {
        setCurrentPage('home');
      }, 1000);

    } catch (error) {
      console.error('❌ Login failed:', error);
      
      // Handle specific error messages from backend
      if (error.response?.data?.message) {
        const errorMsg = error.response.data.message;
        
        // Map backend errors to form fields
        if (errorMsg.includes('user not found') || errorMsg.includes('User not found')) {
          setErrors({ emailOrUsername: 'User not found' });
        } else if (errorMsg.includes('password') || errorMsg.includes('invalid user credentials')) {
          setErrors({ password: 'Invalid password' });
        } else if (errorMsg.includes('username or email')) {
          setErrors({ emailOrUsername: errorMsg });
        } else {
          setErrors({ general: errorMsg });
        }
      } else {
        setErrors({ general: 'Login failed. Please try again.' });
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle input change with error clearing
  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
    
    // Also clear general errors
    if (errors.general) {
      const newErrors = { ...errors };
      delete newErrors.general;
      setErrors(newErrors);
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center py-12 px-4`}>
      <div className={`max-w-md w-full ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8`}>
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <PenTool className="w-8 h-8 text-white" />
          </div>
          <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Welcome Back</h2>
          <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Login to your account</p>
        </div>

        {/* General Error Message */}
        {errors.general && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email or Username */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Email or Username
            </label>
            <input
              type="text"
              value={formData.emailOrUsername}
              onChange={(e) => handleInputChange('emailOrUsername', e.target.value)}
              placeholder="Enter your email or username"
              required
              disabled={loading}
              className={`w-full px-4 py-3 rounded-lg ${
                errors.emailOrUsername 
                  ? 'border-2 border-red-500' 
                  : ''
              } ${isDark ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-gray-100 text-gray-900 placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed`}
            />
            {errors.emailOrUsername && (
              <p className="mt-1 text-sm text-red-500">{errors.emailOrUsername}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Enter your password"
                required
                disabled={loading}
                className={`w-full px-4 py-3 rounded-lg ${
                  errors.password 
                    ? 'border-2 border-red-500' 
                    : ''
                } ${isDark ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-gray-100 text-gray-900 placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed`}
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)} 
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'} transition`}
                disabled={loading}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={rememberMe} 
                onChange={(e) => setRememberMe(e.target.checked)} 
                className="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                disabled={loading}
              />
              <span className={`ml-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Remember me
              </span>
            </label>
            <button 
              type="button" 
              className="text-sm text-blue-500 hover:text-blue-600 hover:underline transition"
              onClick={() => {
                // TODO: Implement forgot password functionality
                alert('Forgot password functionality coming soon!');
              }}
              disabled={loading}
            >
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader className="w-5 h-5 mr-2 animate-spin" />
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        {/* Register Link */}
        <p className={`mt-6 text-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Don't have an account?{' '}
          <button 
            onClick={() => setCurrentPage('register')} 
            className="text-blue-500 hover:underline font-semibold"
            disabled={loading}
          >
            Sign up
          </button>
        </p>

      
      </div>
    </div>
  );
}

export default LoginPage;