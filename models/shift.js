// Load required packages
var mongoose = require('mongoose');

// Define our shift schema
var ShiftSchema   = new mongoose.Schema({
  storeId: String,
  userId: String,
  startOfShift: Date,
  endOfShift: Date
});

// Export the Mongoose model
module.exports = mongoose.model('Shift', ShiftSchema);