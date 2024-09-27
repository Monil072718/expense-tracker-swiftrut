import React, { useState, useEffect } from 'react';
import axios from '../services/expenseService';
import { Line, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const Statistics = () => {
  const [expenses, setExpenses] = useState([]);
  const [lineChartData, setLineChartData] = useState(null);
  const [pieChartData, setPieChartData] = useState(null);

  // Fetch expenses on component mount
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('/api/expenses');
        setExpenses(response.data);
        if (response.data.length > 0) {
          generateLineChart(response.data);
          generatePieChart(response.data);
        }
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    fetchExpenses();
  }, []);

  // Generate data for Line Chart (Spending over time)
  const generateLineChart = (expenses) => {
    const sortedExpenses = expenses.sort((a, b) => new Date(a.date) - new Date(b.date));
    const dates = sortedExpenses.map((expense) => new Date(expense.date).toLocaleDateString());
    const amounts = sortedExpenses.map((expense) => expense.amount);

    setLineChartData({
      labels: dates,
      datasets: [
        {
          label: 'Total Expenses Over Time',
          data: amounts,
          fill: false,
          backgroundColor: 'rgb(75, 192, 192)',
          borderColor: 'rgba(75, 192, 192, 0.2)',
        },
      ],
    });
  };

  // Generate data for Pie Chart (Expenses by Category)
  const generatePieChart = (expenses) => {
    const categoryAmounts = {};
    expenses.forEach((expense) => {
      categoryAmounts[expense.category] = (categoryAmounts[expense.category] || 0) + expense.amount;
    });

    setPieChartData({
      labels: Object.keys(categoryAmounts),
      datasets: [
        {
          label: 'Expenses by Category',
          data: Object.values(categoryAmounts),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF5722', '#8BC34A'], // Colors for each category
        },
      ],
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Expense Statistics</h1>

      <div className="flex flex-col items-center justify-center">
        {/* Line Chart - Expenses Over Time */}
        <div className="w-full md:w-3/4 lg:w-1/2 mb-12">
          <h3 className="text-xl font-semibold text-center mb-4">Total Expenses Over Time</h3>
          {lineChartData ? (
            <Line data={lineChartData} />
          ) : (
            <p className="text-center">Loading Line Chart...</p>
          )}
        </div>

        {/* Pie Chart - Expenses by Category */}
        <div className="w-full md:w-3/4 lg:w-1/2">
          <h3 className="text-xl font-semibold text-center mb-4">Expenses by Category</h3>
          {pieChartData ? (
            <Pie data={pieChartData} />
          ) : (
            <p className="text-center">Loading Pie Chart...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Statistics;