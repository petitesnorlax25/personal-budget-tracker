import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Freelance Designer',
      avatar: 'SJ',
      rating: 5,
      quote: 'This budget tracker completely transformed how I manage my finances. The visual insights helped me identify spending patterns I never noticed before. I\'ve saved over $500 per month!',
      color: 'bg-purple-500'
    },
    {
      name: 'Michael Chen',
      role: 'Small Business Owner',
      avatar: 'MC',
      rating: 5,
      quote: 'As a business owner, keeping personal and business expenses separate was challenging. This app made it simple. The export feature saves me hours during tax season.',
      color: 'bg-blue-500'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Marketing Manager',
      avatar: 'ER',
      rating: 5,
      quote: 'I love how intuitive and beautiful the interface is. Setting budget goals and tracking progress has never been easier. It\'s like having a personal financial advisor in my pocket!',
      color: 'bg-green-500'
    }
  ];

  const StarRating = ({ rating }) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`w-5 h-5 ${index < rating ? 'text-yellow-400 fill-current' : 'text-neutral-300 fill-current'}`}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <section id="testimonials" className="bg-white">
      <div className="max-w-7xl mx-auto section-padding">
        {/* Section Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
            Loved by <span className="gradient-text">Thousands</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Join over 50,000 users who have taken control of their finances with our budget tracker.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="card p-8 hover:scale-105 transition-all duration-300 animate-fade-in relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Quote Icon */}
              <svg
                className="absolute top-6 right-6 w-8 h-8 text-primary-100"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              {/* Avatar and User Info */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-14 h-14 ${testimonial.color} rounded-full flex items-center justify-center text-white font-bold text-lg`}>
                  {testimonial.avatar}
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900">{testimonial.name}</h3>
                  <p className="text-sm text-neutral-600">{testimonial.role}</p>
                </div>
              </div>

              {/* Rating */}
              <StarRating rating={testimonial.rating} />

              {/* Quote */}
              <p className="mt-4 text-neutral-700 leading-relaxed italic">
                "{testimonial.quote}"
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-3xl p-12 text-white">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in">
              <p className="text-5xl font-bold mb-2">50K+</p>
              <p className="text-white/80">Active Users</p>
            </div>
            <div className="animate-fade-in animation-delay-200">
              <p className="text-5xl font-bold mb-2">$2.5M</p>
              <p className="text-white/80">Money Saved</p>
            </div>
            <div className="animate-fade-in animation-delay-400">
              <p className="text-5xl font-bold mb-2">4.9/5</p>
              <p className="text-white/80">Average Rating</p>
            </div>
            <div className="animate-fade-in animation-delay-600">
              <p className="text-5xl font-bold mb-2">99.9%</p>
              <p className="text-white/80">Uptime</p>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 text-center">
          <p className="text-neutral-600 mb-8">Trusted by leading financial institutions</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
            {/* Placeholder logos - in real app, these would be actual company logos */}
            <div className="text-neutral-400">
              <svg className="w-32 h-12" viewBox="0 0 120 40" fill="currentColor">
                <text x="0" y="28" fontSize="20" fontWeight="bold">TrustBank</text>
              </svg>
            </div>
            <div className="text-neutral-400">
              <svg className="w-32 h-12" viewBox="0 0 120 40" fill="currentColor">
                <text x="0" y="28" fontSize="20" fontWeight="bold">SecurePay</text>
              </svg>
            </div>
            <div className="text-neutral-400">
              <svg className="w-32 h-12" viewBox="0 0 120 40" fill="currentColor">
                <text x="0" y="28" fontSize="20" fontWeight="bold">FinanceHub</text>
              </svg>
            </div>
            <div className="text-neutral-400">
              <svg className="w-32 h-12" viewBox="0 0 120 40" fill="currentColor">
                <text x="0" y="28" fontSize="20" fontWeight="bold">MoneyWise</text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;