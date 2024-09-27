import React, { useState, useEffect } from 'react';
import axios from '../services/expenseService';
import ReactPaginate from 'react-paginate';

const Home = () => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [category, setCategory] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editId, setEditId] = useState(null);
  const [editDescription, setEditDescription] = useState('');
  const [editAmount, setEditAmount] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const [selectedExpenses, setSelectedExpenses] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null); // For Bulk Upload
  const [uploadMessage, setUploadMessage] = useState('');

  const expensesPerPage = 5;
  const pagesVisited = pageNumber * expensesPerPage;

  // Fetch expenses on component mount
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('/api/expenses');
        setExpenses(response.data);
        setFilteredExpenses(response.data); // Initially display all expenses
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    fetchExpenses();
  }, []);

  // Handle filtering of expenses
  const handleFilter = () => {
    let updatedExpenses = expenses;

    if (category) {
      updatedExpenses = updatedExpenses.filter((expense) => expense.category === category);
    }

    if (paymentMethod) {
      updatedExpenses = updatedExpenses.filter((expense) => expense.paymentMethod === paymentMethod);
    }

    if (searchTerm) {
      updatedExpenses = updatedExpenses.filter((expense) =>
        expense.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredExpenses(updatedExpenses);
  };

  // Apply filters whenever filter inputs change
  useEffect(() => {
    handleFilter();
  }, [category, paymentMethod, searchTerm, expenses]);

  // Handle Bulk Upload functionality
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleBulkUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('/api/expenses/bulk-upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUploadMessage('Bulk upload successful');
      window.location.reload(); // Reload to see updated expenses
    } catch (error) {
      console.error('Bulk upload failed:', error);
      setUploadMessage('Bulk upload failed');
    }
  };

  // Pagination logic
  const displayExpenses = filteredExpenses
    .slice(pagesVisited, pagesVisited + expensesPerPage)
    .map((expense) => (
      <tr key={expense._id} className="border-b">
        <td className="p-2 text-center">
          <input
            type="checkbox"
            className="mr-2"
            checked={selectedExpenses.includes(expense._id)}
            onChange={() => handleSelectExpense(expense._id)}
          />
        </td>
        <td className="p-2">{expense.description}</td>
        <td className="p-2">${expense.amount}</td>
        <td className="p-2">{expense.category}</td>
        <td className="p-2">
          {editId === expense._id ? (
            <div className="flex">
              <input
                type="text"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="border p-2 mr-2"
              />
              <input
                type="number"
                value={editAmount}
                onChange={(e) => setEditAmount(e.target.value)}
                className="border p-2 mr-2"
              />
              <button onClick={() => handleSave(expense._id)} className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded">
                Save
              </button>
            </div>
          ) : (
            <>
              <button onClick={() => handleEdit(expense)} className="bg-yellow-500 hover:bg-yellow-700 text-white px-4 py-2 rounded mr-2">
                Edit
              </button>
              <button onClick={() => handleDelete(expense._id)} className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded">
                Delete
              </button>
            </>
          )}
        </td>
      </tr>
    ));

  const pageCount = Math.ceil(filteredExpenses.length / expensesPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  // Inline editing handlers
  const handleEdit = (expense) => {
    setEditId(expense._id);
    setEditDescription(expense.description);
    setEditAmount(expense.amount);
  };

  const handleSave = async (id) => {
    try {
      await axios.patch(`/api/expenses/${id}`, {
        description: editDescription,
        amount: editAmount,
      });
      setEditId(null); // Close edit mode after saving
      window.location.reload(); // Reload page to see the changes
    } catch (error) {
      console.error('Error saving expense:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/expenses/${id}`);
      setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense._id !== id));
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const handleSelectExpense = (id) => {
    setSelectedExpenses((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((selectedId) => selectedId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const handleBulkDelete = async () => {
    try {
      await axios.post('/api/expenses/bulk-delete', { ids: selectedExpenses });
      setExpenses((prevExpenses) => prevExpenses.filter((expense) => !selectedExpenses.includes(expense._id)));
      setSelectedExpenses([]); // Clear the selected expenses
    } catch (error) {
      console.error('Error deleting expenses:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Expenses</h1>

      {/* Filter Section */}
      <div className="mb-4 flex space-x-4">
        <input
          type="text"
          placeholder="Search by description"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 w-1/3"
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2 w-1/3">
          <option value="">All Categories</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
        </select>

        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="border p-2 w-1/3">
          <option value="">All Payment Methods</option>
          <option value="cash">Cash</option>
          <option value="credit">Credit</option>
        </select>
      </div>

      {/* Bulk Upload Section */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Bulk Upload Expenses</h2>
        <input type="file" onChange={handleFileChange} className="block w-full mt-2 p-2 border rounded" />
        <button onClick={handleBulkUpload} className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Upload
        </button>
        {uploadMessage && <p className="mt-2 text-sm text-red-500">{uploadMessage}</p>}
      </div>

      {/* Display Filtered Expenses in Table Format */}
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Select</th>
            <th className="p-2">Description</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Category</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayExpenses.length > 0 ? displayExpenses : <tr><td colSpan="5" className="text-center p-2">No expenses found</td></tr>}
        </tbody>
      </table>

      <button onClick={handleBulkDelete} disabled={selectedExpenses.length === 0} className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        Delete Selected
      </button>

      {/* Pagination */}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"pagination flex justify-center mt-4"}
        activeClassName={"bg-blue-500 text-white"}
      />
    </div>
  );
};

export default Home;