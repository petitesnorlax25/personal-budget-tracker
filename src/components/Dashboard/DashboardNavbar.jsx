import React from 'react';

const DashboardNavbar = ({ currentUser, onLogout }) => {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow px-6 py-4 flex justify-between items-center">
      {/* Brand */}
      <div className="flex items-center">
              <div className="flex-shrink-0">
                <button
  onClick={() => navigate(currentUser ? '/dashboard' : '/')}
  className="text-2xl font-bold gradient-text hover:opacity-80 transition-opacity"
>
  BudgetTracker
</button>

              </div>
            </div>

      {/* User Info + Logout */}
      <div className="flex items-center gap-4">
        {currentUser && (
          <span className="text-gray-900 dark:text-gray-100 font-medium">
            {currentUser.name || currentUser.email}
          </span>
        )}
      </div>
      
    </nav>
  );
};

export default DashboardNavbar;
