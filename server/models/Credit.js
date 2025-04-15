const mongoose = require('mongoose');

const creditSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  },
  balance: { type: Number, default: 200 }, 
  transactions: [
    {
      type: { type: String, enum: ['earn', 'spend'], required: true },
      amount: Number,
      description: String,
      date: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model('Credit', creditSchema);
