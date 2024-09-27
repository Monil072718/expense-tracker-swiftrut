import React from 'react';
import { useParams } from 'react-router-dom';
import ExpenseForm from '../components/ExpenseForm';

const EditExpense = () => {
  const { id } = useParams(); // Get expense ID from the URL params

  const handleEditExpense = (updatedExpense) => {
    // Call your backend API to update the expense (using Axios)
    console.log('Updating expense with ID:', id, updatedExpense);
  };

  return (
    <div>
      <h2>Edit Expense</h2>
      {/* You would fetch the expense data here and pass it to the form */}
      <ExpenseForm onSubmit={handleEditExpense} />
    </div>
  );
};

export default EditExpense;
