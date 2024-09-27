import React, { useState } from 'react';
import axios from '../services/expenseService';

const AddExpense = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');

  const handleAddExpense = async () => {
    try {
      const expenseData = { description, amount, category, paymentMethod };
      await axios.post('/api/expenses', expenseData);
      alert('Expense added successfully');
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add Expense</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="block w-full mt-2 p-2 border rounded"
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="block w-full mt-2 p-2 border rounded"
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="block w-full mt-2 p-2 border rounded"
        />

        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="block w-full mt-2 p-2 border rounded"
        >
          <option value="cash">Cash</option>
          <option value="credit">Credit</option>
        </select>

        <button
          onClick={handleAddExpense}
          className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default AddExpense;