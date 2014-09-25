// Load required packages
var mongoose = require('mongoose');

// Define our shift schema
var ShiftSchema   = new mongoose.Schema({
  id: { 
    type: String
    // required: true 
  },
  text: { 
    type: String
    // required: true 
  },
  start_date: { 
    type: Date
    // required: true
  },
  end_date: {
    type: Date
    // required: true
  }
});

// Export the Mongoose model
module.exports = mongoose.model('Shift', ShiftSchema);