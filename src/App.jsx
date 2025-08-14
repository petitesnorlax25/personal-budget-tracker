import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Features from './components/Features';
import Preview from './components/Preview';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard/Dashboard';
import { initializeUserData } from './utils/initializeData';
import { ThemeProvider } from './context/ThemeContext';

// Landing page component
const LandingPage = () => (
  <>
    <Hero />
    <Features />
    <Preview />
    <Testimonials />
    <Footer />
  </>
);

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const currentUser = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');
  
  if (!currentUser) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Initialize data on app load
    initializeUserData();
    
    // Check authentication status
    const checkAuth = () => {
      const user = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');
      setIsAuthenticated(!!user);
    };
    
    checkAuth();
    
    // Listen for storage changes (login/logout)
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
          <Routes>
            <Route path="/" element={
              <>
                <Navigation />
                <LandingPage />
              </>
            } />
            <Route
              path="/dashboard/*"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;