import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ExpenseForm from '../components/ExpenseForm';

const EditExpense = () => {
  const { id } = useParams();
  const [expense, setExpense] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpense = async () => {
      const response = await axios.get(`/api/expenses/${id}`);
      setExpense(response.data);
    };

    fetchExpense();
  }, [id]);

  const handleEditExpense = async (updatedExpense) => {
    await axios.patch(`/api/expenses/${id}`, updatedExpense);
    navigate('/');
  };

  if (!expense) return <div>Loading...</div>;

  return (
    <div>
      <h1>Edit Expense</h1>
      <ExpenseForm onSubmit={handleEditExpense} initialData={expense} />
    </div>
  );
};

export default EditExpense;