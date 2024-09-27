import axios from 'axios';
import ExpenseForm from '../components/ExpenseForm';

const AddExpense = () => {
  const handleAddExpense = (expenseData) => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');

    axios
      .post('http://localhost:5500/api/expenses', expenseData, {
        headers: {
          Authorization: `Bearer ${token}`,  // Use the token in the request header
        },
      })
      .then((response) => {
        console.log('Expense added:', response.data);
      })
      .catch((error) => {
        console.error('Error adding expense:', error);
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
