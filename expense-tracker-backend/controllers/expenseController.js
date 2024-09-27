const Expense = require('../models/expenseModel');
const fs = require('fs');
const csvParser = require('csv-parser');

// Add Expense
const addExpense = async (req, res) => {
  const { amount, description, category, paymentMethod, date } = req.body;

  const expense = new Expense({
    user: req.user._id,
    amount,
    description,
    category,
    paymentMethod,
    date,
  });

  const createdExpense = await expense.save();
  res.status(201).json(createdExpense);
};

// Get Expenses
const getExpenses = async (req, res) => {
    try {
      const expenses = await Expense.find({ user: req.user._id }).sort({ date: -1 });
      res.json(expenses);
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error });
    }
  };
  
  // Update Expense
  const updateExpense = async (req, res) => {
    const { id } = req.params;
  
    try {
      const expense = await Expense.findById(id);
  
      if (!expense) {
        return res.status(404).json({ message: 'Expense not found' });
      }
  
      if (expense.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized' });
      }
  
      const updatedExpense = await Expense.findByIdAndUpdate(id, req.body, { new: true });
      res.json(updatedExpense);
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error });
    }
  };
  
  // Delete Expense
  const deleteExpense = async (req, res) => {
    const { id } = req.params;
  
    try {
      console.log(id); // For debugging purpose
  
      const expense = await Expense.findById(id);
  
      if (!expense) {
        return res.status(404).json({ message: 'Expense not found' });
      }
  
      if (expense.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized' });
      }
  
      // Replacing the deprecated remove() with deleteOne()
      await expense.deleteOne();
      res.json({ message: 'Expense removed' });
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ message: 'Server Error', error });
    }
  };


  const addBulkExpenses = (req, res) => {
    const results = [];
    
    fs.createReadStream(req.file.path)
      .pipe(csvParser())
      .on('data', (data) => {
        // Safely parse the date using JavaScript's Date object
        const parsedDate = new Date(data.date);
  
        // Check if the date is valid
        if (!isNaN(parsedDate.getTime())) {
          data.date = parsedDate; // Assign valid date object
        } else {
          return res.status(400).json({ message: `Invalid date format for entry: ${data.description}` });
        }
  
        // Attach the authenticated user's ID to each expense
        if (req.user && req.user.id) {
          data.user = req.user.id;
        } else {
          return res.status(400).json({ message: 'User not authenticated' });
        }
  
        results.push(data);
      })
      .on('end', async () => {
        try {
          await Expense.insertMany(results); // Insert all expenses into the database
          fs.unlinkSync(req.file.path); // Remove the uploaded CSV file
          res.status(200).json({ message: 'Expenses uploaded successfully' });
        } catch (error) {
          res.status(500).json({ message: 'Failed to upload expenses', error });
        }
      });
  };
  
  module.exports = { addExpense, getExpenses, updateExpense, deleteExpense,addBulkExpenses };
  