import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ExpenseForm from '../components/ExpenseForm';
import axios from 'axios';

const EditExpense = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expense, setExpense] = useState(null);

  useEffect(() => {
    // Fetch the expense data based on ID
    axios
      .get(`http://localhost:5500/api/expenses/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        setExpense(response.data); // Set the fetched data as initial values for the form
      })
      .catch((error) => {
        console.error('Error fetching expense:', error);
      });
  }, [id]);

  const handleEditExpense = (updatedExpense) => {
    // Call your backend API to update the expense
    axios
      .put(`http://localhost:5500/api/expenses/${id}`, updatedExpense, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        console.log('Expense updated:', response.data);
        navigate('/'); // Redirect to the dashboard after updating
      })
      .catch((error) => {
        console.error('Error updating expense:', error);
      });
  };

  return (
    <div>
      <h2>Edit Expense</h2>
      {expense ? (
        <ExpenseForm expense={expense} onSubmit={handleEditExpense} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditExpense;
