import React, { useState } from 'react';

const ExpenseForm = ({ onSubmit, initialData }) => {
  const [amount, setAmount] = useState(initialData ? initialData.amount : '');
  const [description, setDescription] = useState(initialData ? initialData.description : '');
  const [category, setCategory] = useState(initialData ? initialData.category : '');
  const [paymentMethod, setPaymentMethod] = useState(initialData ? initialData.paymentMethod : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ amount, description, category, paymentMethod });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
        required
      >
        <option value="" disabled>Select Payment Method</option>
        <option value="cash">Cash</option>
        <option value="credit">Credit</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ExpenseForm;