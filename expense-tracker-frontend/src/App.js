import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddExpense from './pages/AddExpense';
import Statistics from './pages/Statistics';
import Register from './pages/Register';
import Login from './components/Login';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route 
          path="/" 
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/add-expense" 
          element={
            <PrivateRoute>
              <AddExpense />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/statistics" 
          element={
            <PrivateRoute>
              <Statistics />
            </PrivateRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;