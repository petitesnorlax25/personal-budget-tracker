import React from 'react';

const Preview = () => {
  return (
    <section id="preview" className="bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="max-w-7xl mx-auto section-padding">
        {/* Section Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
            See It In <span className="gradient-text">Action</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Experience the intuitive interface that makes budget tracking effortless. Available on all your devices.
          </p>
        </div>

        {/* Device Mockups Container */}
        <div className="relative">
          {/* Desktop Mockup */}
          <div className="relative mx-auto max-w-5xl animate-fade-in">
            {/* Browser Frame */}
            <div className="bg-neutral-800 rounded-t-xl p-3">
              <div className="flex items-center gap-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-neutral-700 rounded-md px-3 py-1 text-xs text-neutral-300 text-center">
                    app.budgettracker.com/dashboard
                  </div>
                </div>
              </div>
            </div>
            
            {/* Screen Content */}
            <div className="bg-white rounded-b-xl shadow-2xl overflow-hidden">
              {/* App Header */}
              <div className="bg-primary-600 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                      <span className="text-primary-600 font-bold text-lg">B</span>
                    </div>
                    <span className="text-white font-semibold text-lg">Budget Tracker</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="text-white/80 hover:text-white">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                    </button>
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">JD</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="p-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
                    <p className="text-green-600 text-sm font-medium mb-1">Total Income</p>
                    <p className="text-2xl font-bold text-green-700">$8,420</p>
                    <p className="text-xs text-green-600 mt-2">↑ 12% from last month</p>
                  </div>
                  <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4">
                    <p className="text-red-600 text-sm font-medium mb-1">Total Expenses</p>
                    <p className="text-2xl font-bold text-red-700">$5,320</p>
                    <p className="text-xs text-red-600 mt-2">↓ 8% from last month</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
                    <p className="text-blue-600 text-sm font-medium mb-1">Savings</p>
                    <p className="text-2xl font-bold text-blue-700">$3,100</p>
                    <p className="text-xs text-blue-600 mt-2">↑ 23% from last month</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
                    <p className="text-purple-600 text-sm font-medium mb-1">Budget Used</p>
                    <p className="text-2xl font-bold text-purple-700">63%</p>
                    <div className="w-full bg-purple-200 rounded-full h-2 mt-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{width: '63%'}}></div>
                    </div>
                  </div>
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Spending Chart */}
                  <div className="bg-neutral-50 rounded-xl p-4">
                    <h3 className="font-semibold text-neutral-800 mb-4">Monthly Spending</h3>
                    <div className="h-48 flex items-end justify-between gap-2">
                      <div className="flex-1 bg-primary-500 rounded-t" style={{height: '60%'}}></div>
                      <div className="flex-1 bg-secondary-500 rounded-t" style={{height: '80%'}}></div>
                      <div className="flex-1 bg-primary-500 rounded-t" style={{height: '45%'}}></div>
                      <div className="flex-1 bg-secondary-500 rounded-t" style={{height: '90%'}}></div>
                      <div className="flex-1 bg-primary-500 rounded-t" style={{height: '70%'}}></div>
                      <div className="flex-1 bg-secondary-500 rounded-t" style={{height: '55%'}}></div>
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-neutral-600">
                      <span>Jan</span>
                      <span>Feb</span>
                      <span>Mar</span>
                      <span>Apr</span>
                      <span>May</span>
                      <span>Jun</span>
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="bg-neutral-50 rounded-xl p-4">
                    <h3 className="font-semibold text-neutral-800 mb-4">Top Categories</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                            </svg>
                          </div>
                          <span className="text-sm font-medium">Housing</span>
                        </div>
                        <span className="text-sm font-semibold">$1,850</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-sm font-medium">Food & Dining</span>
                        </div>
                        <span className="text-sm font-semibold">$620</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                              <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                            </svg>
                          </div>
                          <span className="text-sm font-medium">Transportation</span>
                        </div>
                        <span className="text-sm font-semibold">$450</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 011-1v0a1 1 0 110 2v0a1 1 0 01-1-1z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-sm font-medium">Entertainment</span>
                        </div>
                        <span className="text-sm font-semibold">$280</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Mockup - Positioned Absolute */}
          <div className="absolute -bottom-10 -right-10 w-64 animate-fade-in animation-delay-400 hidden lg:block">
            <div className="bg-neutral-900 rounded-3xl p-2 shadow-2xl">
              <div className="bg-white rounded-3xl overflow-hidden">
                {/* Mobile Status Bar */}
                <div className="bg-primary-600 px-4 py-2">
                  <div className="flex justify-between items-center text-white text-xs">
                    <span>9:41 AM</span>
                    <div className="flex gap-1">
                      <div className="w-4 h-3 bg-white rounded-sm"></div>
                      <div className="w-4 h-3 bg-white rounded-sm"></div>
                      <div className="w-4 h-3 bg-white rounded-sm"></div>
                    </div>
                  </div>
                </div>
                
                {/* Mobile Content */}
                <div className="p-4 h-96 bg-gradient-to-b from-primary-50 to-white">
                  <div className="text-center mb-4">
                    <p className="text-sm text-neutral-600">Available Balance</p>
                    <p className="text-3xl font-bold text-neutral-900">$3,100</p>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <button className="bg-primary-600 text-white rounded-xl py-3 text-sm font-medium">
                      Add Income
                    </button>
                    <button className="bg-secondary-600 text-white rounded-xl py-3 text-sm font-medium">
                      Add Expense
                    </button>
                  </div>
                  
                  {/* Recent Transactions */}
                  <div className="bg-white rounded-xl p-3">
                    <p className="text-sm font-semibold mb-2">Recent</p>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-green-600 text-xs">+</span>
                          </div>
                          <div>
                            <p className="text-xs font-medium">Salary</p>
                            <p className="text-xs text-neutral-500">Today</p>
                          </div>
                        </div>
                        <span className="text-sm font-semibold text-green-600">+$3,200</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                            <span className="text-red-600 text-xs">-</span>
                          </div>
                          <div>
                            <p className="text-xs font-medium">Groceries</p>
                            <p className="text-xs text-neutral-500">Yesterday</p>
                          </div>
                        </div>
                        <span className="text-sm font-semibold text-red-600">-$85</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Platform Availability */}
        <div className="mt-20 text-center">
          <p className="text-neutral-600 mb-6">Available on all platforms</p>
          <div className="flex justify-center gap-8">
            <div className="flex items-center gap-2 text-neutral-700">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 3H4c-1.103 0-2 .897-2 2v11c0 1.103.897 2 2 2h7v2H8v2h8v-2h-3v-2h7c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 14V5h16l.002 9H4z"/>
              </svg>
              <span>Web</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-700">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/>
              </svg>
              <span>iOS</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-700">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/>
              </svg>
              <span>Android</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Preview;