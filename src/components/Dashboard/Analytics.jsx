import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, 
  AreaChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { format, subMonths, startOfMonth, endOfMonth, eachMonthOfInterval, subDays } from 'date-fns';

const Analytics = () => {
  const [transactions, setTransactions] = useState([]);
  const [timeRange, setTimeRange] = useState('6months');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = () => {
    const stored = JSON.parse(localStorage.getItem('transactions') || '[]');
    setTransactions(stored);
  };

  // Get date range based on selection
  const getDateRange = () => {
    const now = new Date();
    let startDate;

    switch (timeRange) {
      case '30days':
        startDate = subDays(now, 30);
        break;
      case '3months':
        startDate = subMonths(now, 3);
        break;
      case '6months':
        startDate = subMonths(now, 6);
        break;
      case '1year':
        startDate = subMonths(now, 12);
        break;
      default:
        startDate = subMonths(now, 6);
    }

    return { startDate, endDate: now };
  };

  // Filter transactions by date range
  const getFilteredTransactions = () => {
    const { startDate, endDate } = getDateRange();
    return transactions.filter(t => {
      const date = new Date(t.date);
      return date >= startDate && date <= endDate;
    });
  };

  // Income vs Expenses over time
  const getIncomeExpensesTrend = () => {
    const { startDate, endDate } = getDateRange();
    const months = eachMonthOfInterval({ start: startDate, end: endDate });
    
    return months.map(month => {
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
      
      return {
        month: format(month, 'MMM yyyy'),
        income,
        expenses,
        profit: income - expenses
      };
    });
  };

  // Category breakdown
  const getCategoryBreakdown = () => {
    const filtered = getFilteredTransactions();
    const categories = {};
    
    filtered
      .filter(t => t.type === 'expense')
      .forEach(t => {
        if (!categories[t.category]) {
          categories[t.category] = 0;
        }
        categories[t.category] += t.amount;
      });
    
    return Object.entries(categories)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  };

  // Daily spending pattern
  const getDailySpendingPattern = () => {
    const filtered = getFilteredTransactions();
    const dailyData = {};
    
    filtered
      .filter(t => t.type === 'expense')
      .forEach(t => {
        const day = format(new Date(t.date), 'yyyy-MM-dd');
        if (!dailyData[day]) {
          dailyData[day] = 0;
        }
        dailyData[day] += t.amount;
      });
    
    const { startDate, endDate } = getDateRange();
    const days = [];
    const current = new Date(startDate);
    
    while (current <= endDate) {
      const dayStr = format(current, 'yyyy-MM-dd');
      days.push({
        date: format(current, 'MMM d'),
        amount: dailyData[dayStr] || 0
      });
      current.setDate(current.getDate() + 1);
    }
    
    return days.slice(-30); // Show last 30 days for readability
  };

  // Top spending categories
  const getTopCategories = () => {
    const breakdown = getCategoryBreakdown();
    return breakdown.slice(0, 5);
  };

  // Spending by day of week
  const getWeekdaySpending = () => {
    const filtered = getFilteredTransactions();
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const weekdayData = weekdays.map(day => ({ day, amount: 0, count: 0 }));
    
    filtered
      .filter(t => t.type === 'expense')
      .forEach(t => {
        const dayIndex = new Date(t.date).getDay();
        weekdayData[dayIndex].amount += t.amount;
        weekdayData[dayIndex].count += 1;
      });
    
    return weekdayData.map(d => ({
      ...d,
      average: d.count > 0 ? d.amount / d.count : 0
    }));
  };

  // Calculate statistics
  const getStatistics = () => {
    const filtered = getFilteredTransactions();
    
    const income = filtered
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expenses = filtered
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const avgDailyExpense = expenses / Math.max(1, getDailySpendingPattern().length);
    const avgTransaction = expenses / Math.max(1, filtered.filter(t => t.type === 'expense').length);
    const savingsRate = income > 0 ? ((income - expenses) / income * 100) : 0;
    
    return {
      totalIncome: income,
      totalExpenses: expenses,
      netSavings: income - expenses,
      avgDailyExpense,
      avgTransaction,
      savingsRate,
      transactionCount: filtered.length
    };
  };

  const stats = getStatistics();
  const incomeExpensesTrend = getIncomeExpensesTrend();
  const categoryBreakdown = getCategoryBreakdown();
  const dailySpending = getDailySpendingPattern();
  const topCategories = getTopCategories();
  const weekdaySpending = getWeekdaySpending();

  const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316', '#eab308', '#84cc16', '#10b981'];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-1">Detailed insights into your financial patterns</p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="30days">Last 30 Days</option>
          <option value="3months">Last 3 Months</option>
          <option value="6months">Last 6 Months</option>
          <option value="1year">Last Year</option>
        </select>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
          <p className="text-sm text-gray-600 mb-1">Net Savings</p>
          <p className={`text-2xl font-bold ${stats.netSavings >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${Math.abs(stats.netSavings).toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {stats.savingsRate.toFixed(1)}% savings rate
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
          <p className="text-sm text-gray-600 mb-1">Avg Daily Expense</p>
          <p className="text-2xl font-bold text-gray-900">
            ${stats.avgDailyExpense.toFixed(2)}
          </p>
          <p className="text-xs text-gray-500 mt-1">Per day</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
          <p className="text-sm text-gray-600 mb-1">Avg Transaction</p>
          <p className="text-2xl font-bold text-gray-900">
            ${stats.avgTransaction.toFixed(2)}
          </p>
          <p className="text-xs text-gray-500 mt-1">Per transaction</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
          <p className="text-sm text-gray-600 mb-1">Total Transactions</p>
          <p className="text-2xl font-bold text-gray-900">
            {stats.transactionCount}
          </p>
          <p className="text-xs text-gray-500 mt-1">In period</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Income vs Expenses Trend */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Income vs Expenses Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={incomeExpensesTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="income" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
              <Area type="monotone" dataKey="expenses" stackId="2" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Expense Categories</h3>
          {categoryBreakdown.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-gray-500">
              <p>No expense data available</p>
            </div>
          )}
        </div>
      </div>

      {/* Additional Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Spending Pattern */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Spending (Last 30 Days)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dailySpending}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#9ca3af" angle={-45} textAnchor="end" height={60} />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Bar dataKey="amount" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Weekday Spending Pattern */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Average Spending by Weekday</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weekdaySpending}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
              <Bar dataKey="average" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Categories Table */}
      <div className="mt-6 bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Spending Categories</h3>
        {topCategories.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="text-left py-2 text-sm font-medium text-gray-700">Category</th>
                  <th className="text-right py-2 text-sm font-medium text-gray-700">Amount</th>
                  <th className="text-right py-2 text-sm font-medium text-gray-700">% of Total</th>
                </tr>
              </thead>
              <tbody>
                {topCategories.map((category, index) => {
                  const percentage = (category.value / stats.totalExpenses * 100).toFixed(1);
                  return (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-3 text-sm text-gray-900">{category.name}</td>
                      <td className="py-3 text-sm text-gray-900 text-right">
                        ${category.value.toLocaleString()}
                      </td>
                      <td className="py-3 text-sm text-gray-600 text-right">{percentage}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No spending data available for the selected period</p>
          </div>
        )}
      </div>

      {/* Insights Section */}
      <div className="mt-6 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-6 border border-primary-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Insights</h3>
        <div className="space-y-3">
          {stats.savingsRate > 20 ? (
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-gray-700">
                Great job! You're saving {stats.savingsRate.toFixed(1)}% of your income, which is above the recommended 20%.
              </p>
            </div>
          ) : stats.savingsRate > 0 ? (
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-sm text-gray-700">
                You're saving {stats.savingsRate.toFixed(1)}% of your income. Consider increasing it to reach the 20% target.
              </p>
            </div>
          ) : (
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-red-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-gray-700">
                You're spending more than you earn. Review your expenses and look for areas to cut back.
              </p>
            </div>
          )}

          {topCategories.length > 0 && (
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-gray-700">
                Your highest spending category is {topCategories[0].name} at ${topCategories[0].value.toLocaleString()}.
              </p>
            </div>
          )}

          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-purple-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <p className="text-sm text-gray-700">
              Your average daily spending is ${stats.avgDailyExpense.toFixed(2)}, with an average transaction value of ${stats.avgTransaction.toFixed(2)}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;