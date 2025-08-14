// Initialize demo data in localStorage if not present
export const initializeUserData = () => {
  // Check if users data already exists in localStorage
  const existingUsers = localStorage.getItem('users');
  
  if (!existingUsers) {
    // Initialize with demo user
    const demoUsers = [
      {
        id: '1',
        fullName: 'Demo User',
        email: 'test@example.com',
        password: 'password123',
        createdAt: '2024-01-01T00:00:00.000Z'
      }
    ];
    
    localStorage.setItem('users', JSON.stringify(demoUsers));
    console.log('Demo user data initialized');
  }
};

// Clear all authentication data
export const clearAuthData = () => {
  localStorage.removeItem('currentUser');
  localStorage.removeItem('rememberMe');
  sessionStorage.removeItem('currentUser');
};

// Get all users
export const getAllUsers = () => {
  try {
    return JSON.parse(localStorage.getItem('users') || '[]');
  } catch (error) {
    console.error('Error getting users:', error);
    return [];
  }
};

// Add a new user
export const addUser = (userData) => {
  try {
    const users = getAllUsers();
    
    // Check if email already exists
    if (users.find(user => user.email === userData.email)) {
      throw new Error('Email already registered');
    }
    
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    return { success: true, user: newUser };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Validate user credentials
export const validateUser = (email, password) => {
  try {
    const users = getAllUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      return { success: true, user };
    } else {
      return { success: false, error: 'Invalid credentials' };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Update user data
export const updateUser = (userId, updates) => {
  try {
    const users = getAllUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    users[userIndex] = { ...users[userIndex], ...updates };
    localStorage.setItem('users', JSON.stringify(users));
    
    return { success: true, user: users[userIndex] };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Delete user
export const deleteUser = (userId) => {
  try {
    const users = getAllUsers();
    const filteredUsers = users.filter(u => u.id !== userId);
    
    if (users.length === filteredUsers.length) {
      throw new Error('User not found');
    }
    
    localStorage.setItem('users', JSON.stringify(filteredUsers));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};