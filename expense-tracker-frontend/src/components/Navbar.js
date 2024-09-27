import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('authToken'); // Get the token to check if the user is logged in

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Clear token on logout
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between">
      <div>
        <Link to="/" className="mr-4 hover:text-yellow-500">Home</Link>
        {token && (
          <>
            <Link to="/add-expense" className="mr-4 hover:text-yellow-500">Add Expense</Link>
            <Link to="/statistics" className="mr-4 hover:text-yellow-500">Statistics</Link>
          </>
        )}
      </div>
      
      <div>
        {token ? (
          <button 
            onClick={handleLogout} 
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="mr-4 hover:text-yellow-500">Login</Link>
            <Link to="/register" className="hover:text-yellow-500">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;