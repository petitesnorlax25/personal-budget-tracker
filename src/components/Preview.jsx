import React from 'react';

const Preview = () => {
  return (
    <section id="preview" className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-neutral-900 dark:to-neutral-800">
      <div className="max-w-7xl mx-auto section-padding">
        {/* Section Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
            See It In <span className="gradient-text">Action</span>
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
            Experience the intuitive interface that makes budget tracking effortless. Available on all your devices.
          </p>
        </div>

        {/* Device Mockups Container */}
        <div className="relative">
          {/* Desktop Mockup */}
          <div className="relative mx-auto max-w-5xl animate-fade-in">
            {/* Browser Frame */}
            <div className="bg-neutral-800 dark:bg-neutral-700 rounded-t-xl p-3">
              <div className="flex items-center gap-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-neutral-700 dark:bg-neutral-600 rounded-md px-3 py-1 text-xs text-neutral-300 dark:text-neutral-200 text-center">
                    app.budgettracker.com/dashboard
                  </div>
                </div>
              </div>
            </div>
            
            {/* Screen Content */}
            <div className="bg-white dark:bg-neutral-900 rounded-b-xl shadow-2xl overflow-hidden">
              {/* App Header */}
              <div className="bg-primary-600 dark:bg-primary-700 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-white dark:bg-neutral-800 rounded-lg flex items-center justify-center">
                      <span className="text-primary-600 dark:text-primary-400 font-bold text-lg">B</span>
                    </div>
                    <span className="text-white dark:text-gray-200 font-semibold text-lg">Budget Tracker</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="text-white/80 hover:text-white">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                    </button>
                    <div className="w-10 h-10 bg-white/20 dark:bg-white/10 rounded-full flex items-center justify-center">
                      <span className="text-white dark:text-gray-200 font-semibold">JD</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="p-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 rounded-xl p-4">
                    <p className="text-green-600 dark:text-green-400 text-sm font-medium mb-1">Total Income</p>
                    <p className="text-2xl font-bold text-green-700 dark:text-green-300">$8,420</p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-2">↑ 12% from last month</p>
                  </div>
                  <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900 dark:to-red-800 rounded-xl p-4">
                    <p className="text-red-600 dark:text-red-400 text-sm font-medium mb-1">Total Expenses</p>
                    <p className="text-2xl font-bold text-red-700 dark:text-red-300">$5,320</p>
                    <p className="text-xs text-red-600 dark:text-red-400 mt-2">↓ 8% from last month</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-xl p-4">
                    <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mb-1">Savings</p>
                    <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">$3,100</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">↑ 23% from last month</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 rounded-xl p-4">
                    <p className="text-purple-600 dark:text-purple-400 text-sm font-medium mb-1">Budget Used</p>
                    <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">63%</p>
                    <div className="w-full bg-purple-200 dark:bg-purple-700 rounded-full h-2 mt-2">
                      <div className="bg-purple-600 dark:bg-purple-400 h-2 rounded-full" style={{width: '63%'}}></div>
                    </div>
                  </div>
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-neutral-50 dark:bg-neutral-800 rounded-xl p-4">
                    <h3 className="font-semibold text-neutral-800 dark:text-neutral-100 mb-4">Monthly Spending</h3>
                    <div className="h-48 flex items-end justify-between gap-2">
                      <div className="flex-1 bg-primary-500 dark:bg-primary-400 rounded-t" style={{height: '60%'}}></div>
                      <div className="flex-1 bg-secondary-500 dark:bg-secondary-400 rounded-t" style={{height: '80%'}}></div>
                      <div className="flex-1 bg-primary-500 dark:bg-primary-400 rounded-t" style={{height: '45%'}}></div>
                      <div className="flex-1 bg-secondary-500 dark:bg-secondary-400 rounded-t" style={{height: '90%'}}></div>
                      <div className="flex-1 bg-primary-500 dark:bg-primary-400 rounded-t" style={{height: '70%'}}></div>
                      <div className="flex-1 bg-secondary-500 dark:bg-secondary-400 rounded-t" style={{height: '55%'}}></div>
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-neutral-600 dark:text-neutral-300">
                      <span>Jan</span>
                      <span>Feb</span>
                      <span>Mar</span>
                      <span>Apr</span>
                      <span>May</span>
                      <span>Jun</span>
                    </div>
                  </div>

                  <div className="bg-neutral-50 dark:bg-neutral-800 rounded-xl p-4">
                    <h3 className="font-semibold text-neutral-800 dark:text-neutral-100 mb-4">Top Categories</h3>
                    <div className="space-y-3">
                      {/* Repeat category items with dark mode compatible colors */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-500 dark:bg-blue-700 rounded-lg flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                            </svg>
                          </div>
                          <span className="text-sm font-medium dark:text-neutral-200">Housing</span>
                        </div>
                        <span className="text-sm font-semibold dark:text-neutral-100">$1,850</span>
                      </div>
                      {/* Repeat other categories similarly */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Mockup */}
          <div className="absolute -bottom-10 -right-10 w-64 animate-fade-in animation-delay-400 hidden lg:block">
            <div className="bg-neutral-900 dark:bg-neutral-800 rounded-3xl p-2 shadow-2xl">
              <div className="bg-white dark:bg-neutral-900 rounded-3xl overflow-hidden">
                {/* Mobile Content */}
                <div className="p-4 h-96 bg-gradient-to-b from-primary-50 dark:from-neutral-800 to-white dark:to-neutral-900">
                  <div className="text-center mb-4">
                    <p className="text-sm text-neutral-600 dark:text-neutral-300">Available Balance</p>
                    <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">$3,100</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Platform Availability */}
        <div className="mt-20 text-center">
          <p className="text-neutral-600 dark:text-neutral-300 mb-6">Available on all platforms</p>
        </div>
      </div>
    </section>
  );
};

export default Preview;
