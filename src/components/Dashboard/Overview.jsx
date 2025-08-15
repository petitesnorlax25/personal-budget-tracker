import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, startOfMonth, endOfMonth, subMonths } from 'date-fns';

const Overview = () => {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
    savingsRate: 0
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    // Load transactions from localStorage
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const userKeyBudget = currentUser ? `budget_${currentUser.email}` : "budget_guest"
    const userKeyTransaction = currentUser ? `transactions_${currentUser.email}` : "transactions_guest"
    const storedTransactions = JSON.parse(localStorage.getItem(userKeyTransaction) || '[]');
    const storedBudgets = JSON.parse(localStorage.getItem(userKeyBudget) || '[]');
    
    setTransactions(storedTransactions);
    setBudgets(storedBudgets);
    
    // Calculate summary
    const currentMonth = new Date();
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    
    const monthTransactions = storedTransactions.filter(t => {
      const date = new Date(t.date);
      return date >= monthStart && date <= monthEnd;
    });
    
    const income = monthTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expenses = monthTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const balance = income - expenses;
    const savingsRate = income > 0 ? ((balance / income) * 100).toFixed(1) : 0;
    
    setSummary({
      totalIncome: income,
      totalExpenses: expenses,
      balance,
      savingsRate
    });
  };

  // Prepare data for charts
  const getMonthlyTrend = () => {
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const month = subMonths(new Date(), i);
      const monthStart = startOfMonth(month);
      const monthEnd = endOfMonth(month);
      
      const monthTransactions = transactions.filter(t => {
        const date = new Date(t.date);
        return date >= monthStart && date <= monthEnd;
      });
      
      const income = monthTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
      
      const expenses = monthTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
      
      months.push({
        month: format(month, 'MMM'),
        income,
        expenses,
        savings: income - expenses
      });
    }
    return months;
  };

  const getCategoryBreakdown = () => {
    const currentMonth = new Date();
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    
    const monthExpenses = transactions.filter(t => {
      const date = new Date(t.date);
      return t.type === 'expense' && date >= monthStart && date <= monthEnd;
    });
    
    const categories = {};
    monthExpenses.forEach(t => {
      if (!categories[t.category]) {
        categories[t.category] = 0;
      }
      categories[t.category] += t.amount;
    });
    
    return Object.entries(categories).map(([name, value]) => ({
      name,
      value
    }));
  };

  const getBudgetStatus = () => {
    return budgets.map(budget => {
      const currentMonth = new Date();
      const monthStart = startOfMonth(currentMonth);
      const monthEnd = endOfMonth(currentMonth);
      
      const spent = transactions
        .filter(t => {
          const date = new Date(t.date);
          return t.type === 'expense' && 
                 t.category === budget.category && 
                 date >= monthStart && 
                 date <= monthEnd;
        })
        .reduce((sum, t) => sum + t.amount, 0);
      
      return {
        ...budget,
        spent,
        percentage: (spent / budget.amount) * 100
      };
    });
  };

  const monthlyTrend = getMonthlyTrend();
  const categoryData = getCategoryBreakdown();
  const budgetStatus = getBudgetStatus();

  const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316', '#eab308', '#84cc16', '#10b981'];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
  Financial Overview
</h1>

        <p className="text-gray-400 mt-1">Track your income, expenses, and savings</p>
      </div>

      {/* Summary Cards */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
  {/* Income Card */}
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
    <div className="flex items-center justify-between mb-4">
      <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </div>
      <span className="text-sm text-green-600 font-medium">+12.5%</span>
    </div>
    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Total Income</h3>
    <p className="text-2xl font-bold text-gray-900 dark:text-white">${summary.totalIncome.toLocaleString()}</p>
    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">This month</p>
  </div>

  {/* Expenses Card */}
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
    <div className="flex items-center justify-between mb-4">
      <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
        </svg>
      </div>
      <span className="text-sm text-red-600 font-medium">+8.2%</span>
    </div>
    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Total Expenses</h3>
    <p className="text-2xl font-bold text-gray-900 dark:text-white">${summary.totalExpenses.toLocaleString()}</p>
    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">This month</p>
  </div>

  {/* Balance Card */}
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
    <div className="flex items-center justify-between mb-4">
      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      </div>
      <span
        className={`text-sm font-medium ${
          summary.balance >= 0 ? 'text-green-600' : 'text-red-600'
        }`}
      >
        {summary.balance >= 0 ? '+' : ''}
        {((summary.balance / (summary.totalIncome || 1)) * 100).toFixed(1)}%
      </span>
    </div>
    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Balance</h3>
    <p
      className={`text-2xl font-bold ${
        summary.balance >= 0
          ? 'text-gray-900 dark:text-white'
          : 'text-red-600'
      }`}
    >
      ${Math.abs(summary.balance).toLocaleString()}
    </p>
    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Available to save</p>
  </div>

  {/* Savings Rate Card */}
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
    <div className="flex items-center justify-between mb-4">
      <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      </div>
      <span className="text-sm text-purple-600 font-medium">Goal: 20%</span>
    </div>
    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Savings Rate</h3>
    <p className="text-2xl font-bold text-gray-900 dark:text-white">{summary.savingsRate}%</p>
    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Of total income</p>
  </div>
</div>


      {/* Charts Section */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
  {/* Monthly Trend Chart */}
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Monthly Trend</h3>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={monthlyTrend}>
        <CartesianGrid 
          strokeDasharray="3 3" 
          stroke={document.documentElement.classList.contains('dark') ? '#374151' : '#f0f0f0'} 
        />
        <XAxis 
          dataKey="month" 
          stroke={document.documentElement.classList.contains('dark') ? '#d1d5db' : '#9ca3af'} 
        />
        <YAxis 
          stroke={document.documentElement.classList.contains('dark') ? '#d1d5db' : '#9ca3af'} 
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: document.documentElement.classList.contains('dark') ? '#1f2937' : '#fff',
            borderColor: document.documentElement.classList.contains('dark') ? '#374151' : '#e5e7eb',
            color: document.documentElement.classList.contains('dark') ? '#f9fafb' : '#111827'
          }}
        />
        <Legend />
        <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981' }} />
        <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} dot={{ fill: '#ef4444' }} />
        <Line type="monotone" dataKey="savings" stroke="#6366f1" strokeWidth={2} dot={{ fill: '#6366f1' }} />
      </LineChart>
    </ResponsiveContainer>
  </div>

  {/* Category Breakdown */}
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Expense Categories</h3>
    {categoryData.length > 0 ? (
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={categoryData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {categoryData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => `$${value.toLocaleString()}`}
            contentStyle={{
              backgroundColor: document.documentElement.classList.contains('dark') ? '#1f2937' : '#fff',
              borderColor: document.documentElement.classList.contains('dark') ? '#374151' : '#e5e7eb',
              color: document.documentElement.classList.contains('dark') ? '#f9fafb' : '#111827'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    ) : (
      <div className="flex items-center justify-center h-[300px] text-gray-500 dark:text-gray-400">
        <p>No expense data available</p>
      </div>
    )}
  </div>
</div>


     {/* Budget Status */}
<div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Budget Status</h3>
  {budgetStatus.length > 0 ? (
    <div className="space-y-4">
      {budgetStatus.map((budget, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {budget.category}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                ${budget.spent.toLocaleString()} / ${budget.amount.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  budget.percentage > 100
                    ? 'bg-red-500'
                    : budget.percentage > 80
                    ? 'bg-yellow-500'
                    : 'bg-green-500'
                }`}
                style={{ width: `${Math.min(budget.percentage, 100)}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
      <p>No budgets set up yet</p>
      <button className="mt-2 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium">
        Create your first budget →
      </button>
    </div>
  )}
</div>


      {/* Recent Transactions */}
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
  <div className="flex items-center justify-between mb-4">
    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Recent Transactions</h3>
    <button className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium">
      View all →
    </button>
  </div>
  {transactions.length > 0 ? (
    <div className="space-y-3">
      {transactions.slice(0, 5).map((transaction, index) => (
        <div
          key={index}
          className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0"
        >
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-lg ${
                transaction.type === 'income'
                  ? 'bg-green-100 dark:bg-green-900/30'
                  : 'bg-red-100 dark:bg-red-900/30'
              }`}
            >
              <svg
                className={`w-4 h-4 ${
                  transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    transaction.type === 'income'
                      ? 'M12 6v6m0 0v6m0-6h6m-6 0H6'
                      : 'M20 12H4'
                  }
                />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">{transaction.description}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{transaction.category}</p>
            </div>
          </div>
          <div className="text-right">
            <p
              className={`font-semibold ${
                transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {format(new Date(transaction.date), 'MMM d')}
            </p>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
      <p>No transactions yet</p>
      <button className="mt-2 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium">
        Add your first transaction →
      </button>
    </div>
  )}
</div>

    </div>
  );
};

export default Overview;