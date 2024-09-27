import React from 'react';
import ExpenseForm from '../components/ExpenseForm';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddExpense = () => {
  const navigate = useNavigate();

  const handleAddExpense = (expenseData) => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');

    // Check if token exists
    if (!token) {
      console.error('No token found. Please log in.');
      navigate('/login'); // Redirect to login if no token is found
      return;
    }

    // Call the backend API to save the expense
    axios
      .post('http://localhost:5500/api/expenses', expenseData, {
        headers: {
          Authorization: `Bearer ${token}`, // Make sure token is formatted correctly
        },
      })
      .then((response) => {
        console.log('Expense added:', response.data);
        navigate('/'); // Redirect to the dashboard after successful addition
      })
      .catch((error) => {
        console.error('Error adding expense:', error.response ? error.response.data : error.message);
      });
  };

  return (
    <div>
      <h2>Add New Expense</h2>
      <ExpenseForm onSubmit={handleAddExpense} />
    </div>
  );
};

export default AddExpense;
