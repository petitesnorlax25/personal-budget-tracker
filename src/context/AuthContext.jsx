import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      // Check localStorage first (for "remember me" users)
      let currentUser = localStorage.getItem('currentUser');
      
      // If not in localStorage, check sessionStorage
      if (!currentUser) {
        currentUser = sessionStorage.getItem('currentUser');
      }

      if (currentUser) {
        setUser(JSON.parse(currentUser));
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password, rememberMe = false) => {
    try {
      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Find user with matching credentials
      const foundUser = users.find(
        u => u.email === email && u.password === password
      );

      if (!foundUser) {
        throw new Error('Invalid email or password');
      }

      // Create session data
      const sessionData = {
        id: foundUser.id,
        fullName: foundUser.fullName,
        email: foundUser.email,
        loginTime: new Date().toISOString()
      };

      // Store session based on rememberMe preference
      if (rememberMe) {
        localStorage.setItem('currentUser', JSON.stringify(sessionData));
        localStorage.setItem('rememberMe', 'true');
      } else {
        sessionStorage.setItem('currentUser', JSON.stringify(sessionData));
        localStorage.removeItem('rememberMe');
      }

      setUser(sessionData);
      return { success: true, user: sessionData };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      // Get existing users
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Check if email already exists
      if (existingUsers.find(user => user.email === userData.email)) {
        throw new Error('Email already registered');
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        fullName: userData.fullName,
        email: userData.email,
        password: userData.password, // In production, this should be hashed
        createdAt: new Date().toISOString()
      };

      // Add to users array
      existingUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(existingUsers));

      // Auto-login after registration
      const sessionData = {
        id: newUser.id,
        fullName: newUser.fullName,
        email: newUser.email,
        loginTime: new Date().toISOString()
      };

      localStorage.setItem('currentUser', JSON.stringify(sessionData));
      setUser(sessionData);

      return { success: true, user: sessionData };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    // Clear all session data
    localStorage.removeItem('currentUser');
    localStorage.removeItem('rememberMe');
    sessionStorage.removeItem('currentUser');
    setUser(null);
  };

  const updateProfile = async (updates) => {
    try {
      if (!user) {
        throw new Error('No user logged in');
      }

      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userIndex = users.findIndex(u => u.id === user.id);

      if (userIndex === -1) {
        throw new Error('User not found');
      }

      // Update user data
      users[userIndex] = { ...users[userIndex], ...updates };
      localStorage.setItem('users', JSON.stringify(users));

      // Update session data
      const updatedSessionData = { ...user, ...updates };
      
      // Update in appropriate storage
      if (localStorage.getItem('rememberMe') === 'true') {
        localStorage.setItem('currentUser', JSON.stringify(updatedSessionData));
      } else {
        sessionStorage.setItem('currentUser', JSON.stringify(updatedSessionData));
      }

      setUser(updatedSessionData);
      return { success: true, user: updatedSessionData };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
    checkAuthStatus
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};