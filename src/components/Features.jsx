import React from 'react';

const Features = () => {
  const features = [
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Track Expenses',
      description: 'Easily log and categorize your daily expenses with our intuitive interface. Set budgets and get alerts when you\'re close to limits.',
      color: 'primary'
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
      ),
      title: 'Visualize Spending',
      description: 'Beautiful charts and graphs help you understand your spending patterns at a glance. Identify trends and make informed decisions.',
      color: 'secondary'
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
        </svg>
      ),
      title: 'Export Data',
      description: 'Download your financial data in multiple formats. Generate detailed reports for tax purposes or personal analysis.',
      color: 'primary'
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: 'Secure Storage',
      description: 'Your financial data is protected with bank-level 256-bit encryption. We prioritize your privacy and security above all.',
      color: 'secondary'
    }
  ];

  return (
    <section id="features" className="bg-neutral-50">
      <div className="max-w-7xl mx-auto section-padding">
        {/* Section Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
            Powerful Features for{' '}
            <span className="gradient-text">Smart Budgeting</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Everything you need to manage your personal finances in one place. Simple, powerful, and designed for real life.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`card p-8 group hover:scale-105 transition-all duration-300 animate-fade-in`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon Container */}
              <div className={`inline-flex p-4 rounded-2xl mb-6 transition-colors duration-300
                ${feature.color === 'primary' 
                  ? 'bg-primary-100 text-primary-600 group-hover:bg-primary-600 group-hover:text-white' 
                  : 'bg-secondary-100 text-secondary-600 group-hover:bg-secondary-600 group-hover:text-white'}`}>
                {feature.icon}
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                {feature.description}
              </p>
              
              {/* Learn More Link */}
              <button className={`mt-6 font-semibold inline-flex items-center gap-2 transition-colors duration-300
                ${feature.color === 'primary' 
                  ? 'text-primary-600 hover:text-primary-700' 
                  : 'text-secondary-600 hover:text-secondary-700'}`}>
                Learn More
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Additional Features List */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-neutral-900 mb-6 text-center">
            And Much More...
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              'Recurring Transactions',
              'Multiple Currencies',
              'Budget Goals',
              'Bill Reminders',
              'Category Insights',
              'Mobile Sync',
              'Custom Categories',
              'Financial Calendar',
              'Savings Tracker'
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-neutral-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;