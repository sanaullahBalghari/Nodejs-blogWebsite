// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, logoutUser, registerUser, isAuthenticated, getStoredUser } from '../configuration/services/authService.js';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Check authentication on mount
  useEffect(() => {
    const checkAuth = () => {
      if (isAuthenticated()) {
        const userData = getStoredUser();
        if (userData?.user) {
          setUser(userData.user);
          setIsLoggedIn(true);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // ✅ Login function
  const login = async (credentials) => {
    try {
      setLoading(true);
      const response = await loginUser(credentials);
      
      if (response.success && response.data.user) {
        setUser(response.data.user);
        setIsLoggedIn(true);
        return response;
      }
    } catch (error) {
      console.error('Login error in context:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Register function
  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await registerUser(userData);
      
      if (response.success && response.data) {
        // After registration, you might want to auto-login
        // Or redirect to login page
        return response;
      }
    } catch (error) {
      console.error('Registration error in context:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout function
  const logout = async () => {
    try {
      setLoading(true);
      await logoutUser();
      setUser(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Logout error in context:', error);
      // Clear local state even if API fails
      setUser(null);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    isLoggedIn,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

