import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  // Check if the user is logged in by checking if a token exists in localStorage
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    // Remove the token from localStorage to log out the user
    localStorage.removeItem('token');
    navigate('/login'); // Redirect to the login page after logging out
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/add">Add Expense</Link>
        </li>

        {!token ? (
          // Show Login and Register buttons if the user is NOT logged in
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        ) : (
          // Show Logout button if the user IS logged in
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
