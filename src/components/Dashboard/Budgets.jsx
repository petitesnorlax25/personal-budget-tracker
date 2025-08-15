import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth } from 'date-fns';

const Budgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const categories = [
    'Food & Dining', 'Transportation', 'Shopping', 'Entertainment', 
    'Bills & Utilities', 'Healthcare', 'Education', 'Travel', 
    'Personal Care', 'Other'
  ];

  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    period: 'monthly',
    alertThreshold: '80',
    notes: ''
  });

  useEffect(() => {
    loadData();
  }, []);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const userKey = currentUser ? `budget_${currentUser.email}` : "budget_guest";
  const userKeyTransaction = currentUser ? `transactions_${currentUser.email}` : "transactions_guest";
  const loadData = () => {
    const storedBudgets = JSON.parse(localStorage.getItem(userKey) || '[]');
    const storedTransactions = JSON.parse(localStorage.getItem(userKeyTransaction) || '[]');
    setBudgets(storedBudgets);
    setTransactions(storedTransactions);
  };
  ;
  const saveBudgets = (updatedBudgets) => {
    localStorage.setItem(userKey, JSON.stringify(updatedBudgets));
    setBudgets(updatedBudgets);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.category || !formData.amount) {
      alert('Please fill in all required fields');
      return;
    }

    // Check if budget already exists for this category
    if (!editingBudget && budgets.some(b => b.category === formData.category)) {
      alert('A budget already exists for this category');
      return;
    }

    const budget = {
      id: editingBudget ? editingBudget.id : Date.now().toString(),
      ...formData,
      amount: parseFloat(formData.amount),
      alertThreshold: parseInt(formData.alertThreshold),
      createdAt: editingBudget ? editingBudget.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    let updatedBudgets;
    if (editingBudget) {
      updatedBudgets = budgets.map(b => 
        b.id === editingBudget.id ? budget : b
      );
    } else {
      updatedBudgets = [...budgets, budget];
    }

    saveBudgets(updatedBudgets);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      category: '',
      amount: '',
      period: 'monthly',
      alertThreshold: '80',
      notes: ''
    });
    setEditingBudget(null);
    setShowAddModal(false);
  };

  const handleEdit = (budget) => {
    setEditingBudget(budget);
    setFormData({
      category: budget.category,
      amount: budget.amount.toString(),
      period: budget.period,
      alertThreshold: budget.alertThreshold.toString(),
      notes: budget.notes || ''
    });
    setShowAddModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this budget?')) {
      const updatedBudgets = budgets.filter(b => b.id !== id);
      saveBudgets(updatedBudgets);
    }
  };

  const calculateSpent = (category, period = 'monthly') => {
    const now = new Date();
    let startDate, endDate;

    switch (period) {
      case 'weekly':
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - now.getDay());
        weekStart.setHours(0, 0, 0, 0);
        startDate = weekStart;
        endDate = new Date(weekStart);
        endDate.setDate(weekStart.getDate() + 6);
        endDate.setHours(23, 59, 59, 999);
        break;
      case 'monthly':
        startDate = startOfMonth(now);
        endDate = endOfMonth(now);
        break;
      case 'yearly':
        startDate = new Date(now.getFullYear(), 0, 1);
        endDate = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
        break;
      default:
        startDate = startOfMonth(now);
        endDate = endOfMonth(now);
    }

    return transactions
      .filter(t => {
        const date = new Date(t.date);
        return t.type === 'expense' && 
               t.category === category && 
               date >= startDate && 
               date <= endDate;
      })
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const getBudgetStatus = (budget) => {
    const spent = calculateSpent(budget.category, budget.period);
    const percentage = (spent / budget.amount) * 100;
    const remaining = budget.amount - spent;

    let status = 'good';
    if (percentage >= 100) {
      status = 'exceeded';
    } else if (percentage >= budget.alertThreshold) {
      status = 'warning';
    }

    return { spent, percentage, remaining, status };
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'good':
        return 'green';
      case 'warning':
        return 'yellow';
      case 'exceeded':
        return 'red';
      default:
        return 'gray';
    }
  };

  const totalBudget = budgets.reduce((sum, b) => sum + b.amount, 0);
  const totalSpent = budgets.reduce((sum, b) => {
    const { spent } = getBudgetStatus(b);
    return sum + spent;
  }, 0);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Budgets</h1>
          <p className="text-gray-400 mt-1">Set and track your spending limits</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Create Budget
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
  {/* Total Budget */}
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600 dark:text-gray-400">Total Budget</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          ${totalBudget.toLocaleString()}
        </p>
      </div>
      <div className="p-3 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
        <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      </div>
    </div>
  </div>

  {/* Total Spent */}
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600 dark:text-gray-400">Total Spent</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          ${totalSpent.toLocaleString()}
        </p>
      </div>
      <div className="p-3 bg-orange-100 dark:bg-orange-900/40 rounded-lg">
        <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
    </div>
  </div>

  {/* Remaining */}
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600 dark:text-gray-400">Remaining</p>
        <p
          className={`text-2xl font-bold ${
            totalBudget - totalSpent >= 0
              ? 'text-green-600 dark:text-green-400'
              : 'text-red-600 dark:text-red-400'
          }`}
        >
          ${Math.abs(totalBudget - totalSpent).toLocaleString()}
        </p>
      </div>
      <div
        className={`p-3 rounded-lg ${
          totalBudget - totalSpent >= 0
            ? 'bg-green-100 dark:bg-green-900/40'
            : 'bg-red-100 dark:bg-red-900/40'
        }`}
      >
        <svg
          className={`w-6 h-6 ${
            totalBudget - totalSpent >= 0
              ? 'text-green-600 dark:text-green-400'
              : 'text-red-600 dark:text-red-400'
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    </div>
  </div>
</div>


      {/* Budgets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {budgets.length > 0 ? (
    budgets.map((budget) => {
      const { spent, percentage, remaining, status } = getBudgetStatus(budget);
      const color = getStatusColor(status);

      return (
        <div
          key={budget.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-100 dark:border-gray-700"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {budget.category}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                {budget.period}
              </p>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => handleEdit(budget)}
                className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
              <button
                onClick={() => handleDelete(budget.id)}
                className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-300">Spent</span>
              <span className={`font-medium text-${color}-600 dark:text-${color}-400`}>
                ${spent.toLocaleString()} / ${budget.amount.toLocaleString()}
              </span>
            </div>

            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div
                className={`h-3 rounded-full bg-${color}-500 transition-all duration-300`}
                style={{ width: `${Math.min(percentage, 100)}%` }}
              />
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-300">
                {percentage.toFixed(0)}% used
              </span>
              <span
                className={`font-medium ${
                  remaining >= 0
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                {remaining >= 0
                  ? `$${remaining.toLocaleString()} left`
                  : `$${Math.abs(remaining).toLocaleString()} over`}
              </span>
            </div>

            {status === 'warning' && (
              <div className="flex items-center gap-2 p-2 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
                <svg
                  className="w-4 h-4 text-yellow-600 dark:text-yellow-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span className="text-xs text-yellow-700 dark:text-yellow-300">
                  Approaching limit
                </span>
              </div>
            )}

            {status === 'exceeded' && (
              <div className="flex items-center gap-2 p-2 bg-red-50 dark:bg-red-900/30 rounded-lg">
                <svg
                  className="w-4 h-4 text-red-600 dark:text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-xs text-red-700 dark:text-red-300">
                  Budget exceeded!
                </span>
              </div>
            )}

            {budget.notes && (
              <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                {budget.notes}
              </p>
            )}
          </div>
        </div>
      );
    })
  ) : (
    <div className="col-span-full bg-white dark:bg-gray-800 rounded-lg shadow-sm p-12 border border-gray-100 dark:border-gray-700 text-center">
      <svg
        className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
        No budgets yet
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mb-4">
        Create your first budget to start tracking your spending
      </p>
      <button
        onClick={() => setShowAddModal(true)}
        className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
      >
        Create Budget
      </button>
    </div>
  )}
</div>


      {/* Add/Edit Budget Modal */}
      {showAddModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4">
    <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          {editingBudget ? 'Edit Budget' : 'Create Budget'}
        </h2>
        <button
          onClick={resetForm}
          className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-400"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            required
            disabled={editingBudget}
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat} disabled={!editingBudget && budgets.some(b => b.category === cat)}>
                {cat} {!editingBudget && budgets.some(b => b.category === cat) && '(Already has budget)'}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Budget Amount</label>
          <input
            type="number"
            step="0.01"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="0.00"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Period</label>
          <select
            value={formData.period}
            onChange={(e) => setFormData({ ...formData, period: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Alert Threshold (%)
          </label>
          <input
            type="number"
            min="0"
            max="100"
            value={formData.alertThreshold}
            onChange={(e) => setFormData({ ...formData, alertThreshold: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            You'll be alerted when spending reaches this percentage
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Notes (optional)</label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            rows="3"
            placeholder="Add any notes about this budget..."
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={resetForm}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            {editingBudget ? 'Update' : 'Create'} Budget
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
};

export default Budgets;