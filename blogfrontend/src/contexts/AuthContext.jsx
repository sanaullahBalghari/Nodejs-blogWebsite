// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  loginUser, 
  logoutUser, 
  registerUser, 
  isAuthenticated, 
  getStoredUser 
} from '../configuration/services/authService.js';

// Create Auth Context
const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// Auth Provider Component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Check authentication on mount (restore session)
  useEffect(() => {
    const checkAuth = () => {
      try {
        if (isAuthenticated()) {
          const userData = getStoredUser();
          if (userData?.user) {
            setUser(userData.user);
            setIsLoggedIn(true);
            
            console.log('✅ User session restored:', userData.user);
          }
        }
      } catch (error) {
        console.error('❌ Failed to restore session:', error);
        // Clear invalid data
        localStorage.removeItem('userData');
        localStorage.removeItem('currentUser');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // ✅ Register function
  const register = async (userData) => {
    try {
      setLoading(true);
      
      console.log('🔄 AuthContext: Starting registration...');
      
      // Call API service
      const response = await registerUser(userData);
      
      console.log('✅ AuthContext: Registration successful', response);

      // Note: Your backend doesn't auto-login after registration
      // So we don't set user state here
      // User will need to login after registration
      
      return response;
    } catch (error) {
      console.error('❌ AuthContext: Registration failed', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Login function
  const login = async (credentials) => {
    try {
      setLoading(true);
      
      console.log('🔄 AuthContext: Starting login...');
      
      // Call API service
      const response = await loginUser(credentials);
      
      console.log('✅ AuthContext: Login successful', response);

      // Update state with user data
      if (response.success && response.data?.user) {
        setUser(response.data.user);
        setIsLoggedIn(true);
        
        console.log('✅ AuthContext: User state updated', response.data.user);
      }
      
      return response;
    } catch (error) {
      console.error('❌ AuthContext: Login failed', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout function
  const logout = async () => {
    try {
      setLoading(true);
      
      console.log('🔄 AuthContext: Starting logout...');
      
      // Call API service
      await logoutUser();
      
      console.log('✅ AuthContext: Logout successful');

      // Clear state
      setUser(null);
      setIsLoggedIn(false);
      
    } catch (error) {
      console.error('❌ AuthContext: Logout failed', error);
      
      // Even if API fails, clear local state
      setUser(null);
      setIsLoggedIn(false);
      
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update user profile (for future use)
  const updateUser = (updatedUserData) => {
    setUser(updatedUserData);
    
    // Update localStorage
    const storedData = getStoredUser();
    if (storedData) {
      storedData.user = updatedUserData;
      localStorage.setItem('userData', JSON.stringify(storedData));
      localStorage.setItem('currentUser', JSON.stringify(updatedUserData));
    }
  };

  // Context value
  const value = {
    user,              // Current user object
    loading,           // Loading state (for showing spinners)
    isLoggedIn,        // Boolean flag for auth status
    register,          // Register function
    login,             // Login function
    logout,            // Logout function
    updateUser,        // Update user data function
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;