// Load required packages
var mongoose = require('mongoose');

// Define our shift schema
var ShiftSchema   = new mongoose.Schema({
  userId: { 
    type: String
    // required: true 
  },
  company: {
    type: String,
    required: true
  },
  storeAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    province: { type: String, required: true },
    postalCode: { type: String, required: true }
  },
  text: { 
    type: String
  },
  start_date: { 
    type: Date
    // required: true
  },
  end_date: {
    type: Date
    // required: true
  },
  state: {
    type: String
  }
});

// Export the Mongoose model
module.exports = mongoose.model('Shift', ShiftSchema);