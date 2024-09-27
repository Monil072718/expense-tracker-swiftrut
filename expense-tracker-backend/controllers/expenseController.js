const Expense = require('../models/Expense');

// Add a new expense
const addExpense = async (req, res) => {
    try {
      // Your logic for adding the expense
      const { amount, description, date, category } = req.body;
  
      const newExpense = await Expense.create({
        amount,
        description,
        date,
        category,
        user: req.user.id, // Assuming you attach user ID via JWT middleware
      });
  
      res.status(201).json(newExpense);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

// Get all expenses for a user
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update an expense
exports.updateExpense = async (req, res) => {
  const { amount, description, category, paymentMethod, date } = req.body;

  try {
    let expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ msg: 'Expense not found' });
    }

    // Make sure the user owns the expense
    if (expense.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    expense = await Expense.findByIdAndUpdate(
      req.params.id,
      { $set: { amount, description, category, paymentMethod, date } },
      { new: true }
    );

    res.json(expense);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Delete an expense
// Delete an expense
exports.deleteExpense = async (req, res) => {
    try {
      let expense = await Expense.findById(req.params.id);
  
      if (!expense) {
        return res.status(404).json({ msg: 'Expense not found' });
      }
  
      // Make sure the user owns the expense
      if (expense.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Not authorized' });
      }
  
      await Expense.findByIdAndDelete(req.params.id);
  
      res.json({ msg: 'Expense removed' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
  
  module.exports = { addExpense }; 