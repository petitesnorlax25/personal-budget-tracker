import React, { useState, useEffect } from 'react';

const Settings = () => {
  const [user, setUser] = useState(null);
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    phone: '',
    currency: 'USD',
    language: 'en',
    timezone: 'UTC'
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    budgetAlerts: true,
    weeklyReports: false,
    monthlyReports: true,
    transactionAlerts: true
  });
  
  const [preferences, setPreferences] = useState({
    darkMode: false,
    compactView: false,
    showDecimals: true,
    dateFormat: 'MM/DD/YYYY',
    startOfWeek: 'sunday'
  });

  const [activeTab, setActiveTab] = useState('profile');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = () => {
    const currentUser = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');
    if (currentUser) {
      const userData = JSON.parse(currentUser);
      setUser(userData);
      setProfileData({
        ...profileData,
        fullName: userData.fullName || '',
        email: userData.email || ''
      });
    }
    
    // Load saved preferences
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    }
    
    const savedPreferences = localStorage.getItem('preferences');
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    
    // Update user profile
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map(u => {
      if (u.id === user.id) {
        return { ...u, fullName: profileData.fullName, phone: profileData.phone };
      }
      return u;
    });
    
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    // Update current session
    const updatedUser = { ...user, fullName: profileData.fullName };
    if (localStorage.getItem('currentUser')) {
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    } else {
      sessionStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
    
    setUser(updatedUser);
    alert('Profile updated successfully!');
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      alert('Password must be at least 6 characters long!');
      return;
    }
    
    // Update password
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userToUpdate = users.find(u => u.id === user.id);
    
    if (userToUpdate && userToUpdate.password === passwordData.currentPassword) {
      const updatedUsers = users.map(u => {
        if (u.id === user.id) {
          return { ...u, password: passwordData.newPassword };
        }
        return u;
      });
      
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      alert('Password changed successfully!');
      
      // Reset form
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } else {
      alert('Current password is incorrect!');
    }
  };

  const handleNotificationUpdate = () => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
    alert('Notification preferences saved!');
  };

  const handlePreferencesUpdate = () => {
    localStorage.setItem('preferences', JSON.stringify(preferences));
    alert('Preferences saved!');
  };

  const handleExportData = () => {
    const data = {
      transactions: JSON.parse(localStorage.getItem('transactions') || '[]'),
      budgets: JSON.parse(localStorage.getItem('budgets') || '[]'),
      user: user,
      exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `budget-tracker-export-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImportData = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);
          
          if (data.transactions) {
            localStorage.setItem('transactions', JSON.stringify(data.transactions));
          }
          if (data.budgets) {
            localStorage.setItem('budgets', JSON.stringify(data.budgets));
          }
          
          alert('Data imported successfully!');
          window.location.reload();
        } catch (error) {
          alert('Error importing data. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // Remove user from users list
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = users.filter(u => u.id !== user.id);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      // Clear session
      localStorage.removeItem('currentUser');
      sessionStorage.removeItem('currentUser');
      
      // Clear user data
      localStorage.removeItem('transactions');
      localStorage.removeItem('budgets');
      
      alert('Account deleted successfully.');
      window.location.href = '/';
    }
    setShowDeleteModal(false);
  };

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all your financial data? This action cannot be undone.')) {
      localStorage.removeItem('transactions');
      localStorage.removeItem('budgets');
      alert('All financial data has been cleared.');
      window.location.reload();
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Settings</h1>
        <p className="text-gray-400 mt-1">Manage your account and preferences</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
  <nav className="-mb-px flex flex-wrap gap-2 sm:space-x-8">
    {['profile', 'security', 'notifications', 'preferences', 'data'].map((tab) => (
      <button
        key={tab}
        onClick={() => setActiveTab(tab)}
        className={`py-2 px-3 border-b-2 font-medium text-sm capitalize ${
          activeTab === tab
            ? 'border-primary-500 text-primary-600'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        }`}
      >
        {tab}
      </button>
    ))}
  </nav>
</div>


      {/* Tab Content */}
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm p-6 border border-gray-100 dark:border-gray-600">
  {/* Profile Tab */}
  {activeTab === 'profile' && (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Profile Information</h2>
      <form onSubmit={handleProfileUpdate} className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
          <input
            type="text"
            value={profileData.fullName}
            onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 
                       focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
          <input
            type="email"
            value={profileData.email}
            disabled
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Email cannot be changed</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
          <input
            type="tel"
            value={profileData.phone}
            onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
            placeholder="+1 (555) 000-0000"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 
                       focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Currency</label>
          <select
            value={profileData.currency}
            onChange={(e) => setProfileData({ ...profileData, currency: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 
                       focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="JPY">JPY (¥)</option>
          </select>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Save Changes
        </button>
      </form>
    </div>
  )}

  {/* Security Tab */}
  {activeTab === 'security' && (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Security Settings</h2>
      <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
        {['currentPassword', 'newPassword', 'confirmPassword'].map((field, i) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {field === 'currentPassword' ? 'Current Password' : field === 'newPassword' ? 'New Password' : 'Confirm New Password'}
            </label>
            <input
              type="password"
              value={passwordData[field]}
              onChange={(e) => setPasswordData({ ...passwordData, [field]: e.target.value })}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 
                         focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        ))}

        <button
          type="submit"
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Change Password
        </button>
      </form>

      <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-600">
        <h3 className="text-md font-semibold text-gray-900 dark:text-gray-100 mb-2">Two-Factor Authentication</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Add an extra layer of security to your account</p>
        <button className="px-4 py-2 border border-primary-600 text-primary-600 dark:text-primary-400 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-700 transition-colors">
          Enable 2FA
        </button>
      </div>
    </div>
  )}

  {/* Notifications Tab */}
  {activeTab === 'notifications' && (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Notification Preferences</h2>
      <div className="space-y-4 max-w-md">
        {Object.entries({
          emailNotifications: 'Email Notifications',
          budgetAlerts: 'Budget Alerts',
          weeklyReports: 'Weekly Reports',
          monthlyReports: 'Monthly Reports',
          transactionAlerts: 'Transaction Alerts'
        }).map(([key, label]) => (
          <div key={key} className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {key === 'budgetAlerts' && 'Get notified when you approach budget limits'}
                {key === 'weeklyReports' && 'Receive weekly spending summaries'}
                {key === 'monthlyReports' && 'Receive monthly financial reports'}
                {key === 'transactionAlerts' && 'Get notified for large transactions'}
                {key === 'emailNotifications' && 'Receive important updates via email'}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications[key]}
                onChange={(e) => setNotifications({ ...notifications, [key]: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border dark:after:border-gray-500 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
        ))}

        <button
          onClick={handleNotificationUpdate}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Save Preferences
        </button>
      </div>
    </div>
  )}

  {/* Preferences Tab */}
  {activeTab === 'preferences' && (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">App Preferences</h2>
      <div className="space-y-4 max-w-md">
        {['dateFormat', 'startOfWeek'].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {field === 'dateFormat' ? 'Date Format' : 'Start of Week'}
            </label>
            <select
              value={preferences[field]}
              onChange={(e) => setPreferences({ ...preferences, [field]: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 
                         focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {field === 'dateFormat' ? (
                <>
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </>
              ) : (
                <>
                  <option value="sunday">Sunday</option>
                  <option value="monday">Monday</option>
                </>
              )}
            </select>
          </div>
        ))}

        <div className="space-y-3">
          {Object.entries({
            darkMode: 'Dark Mode',
            compactView: 'Compact View',
            showDecimals: 'Show Decimal Places'
          }).map(([key, label]) => (
            <div key={key} className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences[key]}
                  onChange={(e) => setPreferences({ ...preferences, [key]: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border dark:after:border-gray-500 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          ))}
        </div>

        <button
          onClick={handlePreferencesUpdate}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Save Preferences
        </button>
      </div>
    </div>
  )}

  {/* Data Tab */}
  {activeTab === 'data' && (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Data Management</h2>

      <div className="space-y-6">
        {/* Export Data */}
        <div className="border-b border-gray-200 dark:border-gray-600 pb-6">
          <h3 className="text-md font-semibold text-gray-900 dark:text-gray-100 mb-2">Export Data</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Download all your financial data as a JSON file</p>
          <button
            onClick={handleExportData}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export Data
          </button>
        </div>

        {/* Import Data */}
        <div className="border-b border-gray-200 dark:border-gray-600 pb-6">
          <h3 className="text-md font-semibold text-gray-900 dark:text-gray-100 mb-2">Import Data</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Import financial data from a previous export</p>
          <input type="file" accept=".json" onChange={handleImportData} className="hidden" id="import-file" />
          <label
            htmlFor="import-file"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Import Data
          </label>
        </div>

        {/* Clear Data */}
        <div className="border-b border-gray-200 dark:border-gray-600 pb-6">
          <h3 className="text-md font-semibold text-gray-900 dark:text-gray-100 mb-2">Clear Data</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Remove all transactions and budgets (cannot be undone)</p>
          <button
            onClick={handleClearData}
            className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
          >
            Clear All Data
          </button>
        </div>

        {/* Delete Account */}
        <div>
          <h3 className="text-md font-semibold text-red-600 mb-2">Danger Zone</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Permanently delete your account and all associated data</p>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  )}
</div>


      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4">
  <div className="bg-white dark:bg-gray-700 rounded-xl max-w-md w-full p-6">
    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Delete Account</h2>
    <p className="text-gray-600 dark:text-gray-300 mb-6">
      Are you absolutely sure you want to delete your account? This action cannot be undone and all your data will be permanently lost.
    </p>
    <div className="flex gap-3">
      <button
        onClick={() => setShowDeleteModal(false)}
        className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
      >
        Cancel
      </button>
      <button
        onClick={handleDeleteAccount}
        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
      >
        Delete Account
      </button>
    </div>
  </div>
</div>

      )}
    </div>
  );
};

export default Settings;