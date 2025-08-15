import React from 'react';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 overflow-hidden">
  {/* Background decoration */}
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full opacity-20 dark:bg-primary-700 animate-float"></div>
    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-200 rounded-full opacity-20 dark:bg-secondary-700 animate-float animation-delay-400"></div>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-100 rounded-full opacity-10 dark:bg-primary-800"></div>
  </div>

  <div className="relative max-w-7xl mx-auto section-padding">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      {/* Text Content */}
      <div className="text-center lg:text-left animate-slide-up">
        <h1 className="text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-neutral-100 mb-6 leading-tight">
          Take Control of Your{' '}
          <span className="gradient-text">Finances</span>
        </h1>
        <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-8 leading-relaxed">
          Track expenses, visualize spending patterns, and achieve your financial goals with our intuitive budget tracking app. Start your journey to financial freedom today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <button className="btn-primary">Get Started Free</button>
          <button className="btn-secondary">Watch Demo</button>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 flex items-center gap-8 justify-center lg:justify-start">
          <div className="text-center">
            <p className="text-3xl font-bold text-primary-600">50K+</p>
            <p className="text-sm text-neutral-600 dark:text-neutral-300">Active Users</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-primary-600">4.9★</p>
            <p className="text-sm text-neutral-600 dark:text-neutral-300">User Rating</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-primary-600">256-bit</p>
            <p className="text-sm text-neutral-600 dark:text-neutral-300">Encryption</p>
          </div>
        </div>
      </div>

      {/* Hero Image/Illustration */}
      <div className="relative animate-fade-in animation-delay-200">
        <div className="relative z-10">
          <svg className="w-full h-auto" viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg">
            {/* Main dashboard mockup */}
            <rect x="50" y="50" width="400" height="300" rx="10" fill="#ffffff" stroke="#e5e7eb" strokeWidth="2" className="dark:fill-gray-700 dark:stroke-gray-600"/>
            <rect x="50" y="50" width="400" height="40" rx="10" fill="#3b82f6"/>
            <circle cx="80" cy="70" r="8" fill="#ffffff" opacity="0.9" className="dark:fill-gray-300"/>
            <circle cx="110" cy="70" r="8" fill="#ffffff" opacity="0.9" className="dark:fill-gray-300"/>
            <circle cx="140" cy="70" r="8" fill="#ffffff" opacity="0.9" className="dark:fill-gray-300"/>
            <rect x="70" y="110" width="180" height="120" rx="5" fill="#eff6ff" className="dark:fill-gray-800"/>
            {/* Bar chart */}
            <rect x="90" y="180" width="20" height="40" fill="#3b82f6"/>
            <rect x="120" y="160" width="20" height="60" fill="#22c55e"/>
            <rect x="150" y="170" width="20" height="50" fill="#3b82f6"/>
            <rect x="180" y="150" width="20" height="70" fill="#22c55e"/>
            <rect x="210" y="140" width="20" height="80" fill="#3b82f6"/>
            {/* Pie chart */}
            <circle cx="340" cy="170" r="50" fill="#eff6ff" className="dark:fill-gray-800"/>
            <path d="M 340 120 A 50 50 0 0 1 390 170 L 340 170 Z" fill="#3b82f6"/>
            <path d="M 390 170 A 50 50 0 0 1 340 220 L 340 170 Z" fill="#22c55e"/>
            <path d="M 340 220 A 50 50 0 1 1 340 120 L 340 170 Z" fill="#60a5fa"/>
            {/* Stats cards */}
            <rect x="70" y="250" width="100" height="70" rx="5" fill="#f0fdf4" className="dark:fill-gray-700"/>
            <text x="120" y="275" textAnchor="middle" fontSize="12" fill="#16a34a">Income</text>
            <text x="120" y="300" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#16a34a">$5,240</text>
            <rect x="190" y="250" width="100" height="70" rx="5" fill="#fef2f2" className="dark:fill-gray-700"/>
            <text x="240" y="275" textAnchor="middle" fontSize="12" fill="#dc2626">Expenses</text>
            <text x="240" y="300" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#dc2626">$3,120</text>
            <rect x="310" y="250" width="100" height="70" rx="5" fill="#eff6ff" className="dark:fill-gray-800"/>
            <text x="360" y="275" textAnchor="middle" fontSize="12" fill="#2563eb">Savings</text>
            <text x="360" y="300" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#2563eb">$2,120</text>
          </svg>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-secondary-400 rounded-full opacity-20 dark:bg-secondary-700 animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-16 h-16 bg-primary-400 rounded-full opacity-20 dark:bg-primary-700 animate-pulse animation-delay-200"></div>
      </div>
    </div>
  </div>
</section>

  );
};

export default Hero;