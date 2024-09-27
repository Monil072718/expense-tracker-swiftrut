const mongoose = require('mongoose');

const expenseSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;