const express = require('express');
const { addExpense, getExpenses, updateExpense, deleteExpense, addBulkExpenses } = require('../controllers/expenseController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();
const multer = require('multer');
const Expense = require('../models/expenseModel');

const upload = multer({ dest: 'uploads/' });
// Add Expense
router.post('/', protect, addExpense);
router.post('/bulk-upload', protect, upload.single('file'), addBulkExpenses);

// Get Expenses
router.get('/', protect, getExpenses);

// Update Expense
router.patch('/:id', protect, updateExpense);

// Delete Expense
router.delete('/:id', protect, deleteExpense);

router.post('/bulk-delete', protect, async (req, res) => {
    try {
      const { ids } = req.body;
  
      // Ensure ids is an array and not empty
      if (!ids || ids.length === 0) {
        return res.status(400).json({ message: 'No IDs provided' });
      }
  
      // Delete multiple expenses matching the provided IDs and belonging to the authenticated user
      const result = await Expense.deleteMany({
        _id: { $in: ids },
        user: req.user.id, // Ensures user can only delete their own expenses
      });
  
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'No expenses found to delete' });
      }
  
      res.status(200).json({ message: 'Expenses deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to delete expenses', error });
    }
  });
  
  module.exports = router;

module.exports = router;