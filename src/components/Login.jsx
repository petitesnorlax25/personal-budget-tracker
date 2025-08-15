import React, { useState } from 'react';

const Login = ({ onClose, switchToRegister }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Find user with matching email and password
      const user = users.find(
        u => u.email === formData.email && u.password === formData.password
      );

      if (!user) {
        setErrors({ general: 'Invalid email or password' });
        setIsLoading(false);
        return;
      }

      // Store current user session
      const sessionData = {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        loginTime: new Date().toISOString()
      };

      if (formData.rememberMe) {
        // Store in localStorage for persistent login
        localStorage.setItem('currentUser', JSON.stringify(sessionData));
        localStorage.setItem('rememberMe', 'true');
      } else {
        // Store in sessionStorage for session-only login
        sessionStorage.setItem('currentUser', JSON.stringify(sessionData));
        localStorage.removeItem('rememberMe');
      }

      // Success - redirect to dashboard
      alert(`Welcome back, ${user.fullName}!`);
      onClose();
      window.location.href = '/dashboard'; // Redirect to dashboard
    } catch (error) {
      setErrors({ general: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert('Password reset functionality would be implemented here. For demo purposes, you can check localStorage for user credentials.');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4 overflow-y-auto">
  <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-8 relative animate-slide-up my-8">
    {/* Close button */}
    <button
      onClick={onClose}
      className="absolute top-4 right-4 text-neutral-400 dark:text-neutral-300 hover:text-neutral-600 dark:hover:text-neutral-100 transition-colors"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    {/* Header */}
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">Welcome Back</h2>
      <p className="text-neutral-600 dark:text-neutral-300">Sign in to continue to Budget Tracker</p>
    </div>

    {/* Form */}
    <form onSubmit={handleSubmit} className="space-y-5">
      {errors.general && (
        <div className="bg-red-50 dark:bg-red-700 text-red-600 dark:text-red-200 p-3 rounded-lg text-sm">
          {errors.general}
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-200 mb-2">
          Email Address
        </label>
        <div className="relative">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 pl-10 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all
              ${errors.email ? 'border-red-500 dark:border-red-400' : 'border-neutral-300 dark:border-gray-600'} dark:bg-gray-700 dark:text-neutral-100 dark:placeholder-gray-400`}
            placeholder="john@example.com"
          />
          <svg className="w-5 h-5 text-neutral-400 dark:text-neutral-300 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
          </svg>
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-300">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-neutral-700 dark:text-neutral-200 mb-2">
          Password
        </label>
        <div className="relative">
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-4 py-3 pl-10 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all
              ${errors.password ? 'border-red-500 dark:border-red-400' : 'border-neutral-300 dark:border-gray-600'} dark:bg-gray-700 dark:text-neutral-100 dark:placeholder-gray-400`}
            placeholder="••••••••"
          />
          <svg className="w-5 h-5 text-neutral-400 dark:text-neutral-300 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-300">{errors.password}</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="rememberMe"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
            className="w-4 h-4 text-primary-600 border-neutral-300 dark:border-gray-500 rounded focus:ring-primary-500"
          />
          <label htmlFor="rememberMe" className="ml-2 text-sm text-neutral-600 dark:text-neutral-300">
            Remember me
          </label>
        </div>
        <button
          type="button"
          onClick={handleForgotPassword}
          className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
        >
          Forgot password?
        </button>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </button>
    </form>

    {/* Switch to register */}
    <div className="mt-6 text-center">
      <p className="text-neutral-600 dark:text-neutral-300">
        Don't have an account?{' '}
        <button
          onClick={switchToRegister}
          className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
        >
          Sign Up
        </button>
      </p>
    </div>

    {/* Social login options */}
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-neutral-300 dark:border-gray-600"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-gray-800 text-neutral-500 dark:text-neutral-300">Or continue with</span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center px-4 py-2 border border-neutral-300 dark:border-gray-600 rounded-lg hover:bg-neutral-50 dark:hover:bg-gray-700 transition-colors">
          {/* Google SVG */}
        </button>
        <button className="flex items-center justify-center px-4 py-2 border border-neutral-300 dark:border-gray-600 rounded-lg hover:bg-neutral-50 dark:hover:bg-gray-700 transition-colors">
          {/* Facebook SVG */}
        </button>
      </div>
    </div>

    {/* Demo credentials hint */}
    <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
      <p className="text-xs text-blue-700 dark:text-blue-200 text-center">
        <strong>Demo:</strong> Register first or use test@example.com / password123
      </p>
    </div>
  </div>
</div>

  );
};

export default Login;