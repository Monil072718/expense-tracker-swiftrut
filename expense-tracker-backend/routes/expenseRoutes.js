const express = require('express');
const router = express.Router();
const { getExpenses, updateExpense, deleteExpense } = require('../controllers/expenseController');
const authMiddleware = require('../middlewares/authMiddleware');
const { addExpense } = require('../controllers/expenseController'); 
const { protect } = require('../middlewares/authMiddleware');

// @route   POST /api/expenses
// @desc    Add a new expense
router.post('/', authMiddleware, addExpense);

// @route   GET /api/expenses
// @desc    Get all expenses for a user
router.get('/', authMiddleware, getExpenses);
// router.post('/', protect, addExpense); 
// const { addExpense } = require('../controllers/expenseController');
// const { protect } = require('../middleware/authMiddleware');

console.log(typeof addExpense); // Should log 'function'
console.log(typeof protect);    // Should log 'function'


// @route   PUT /api/expenses/:id
// @desc    Update an expense
router.put('/:id', authMiddleware, updateExpense);

// @route   DELETE /api/expenses/:id
// @desc    Delete an expense
router.delete('/:id', authMiddleware, deleteExpense);

module.exports = router;
