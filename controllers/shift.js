// Load required packages
var Shift = require('../models/shift');

// Create endpoint /api/shifts for POSTS
exports.postShifts = function(req, res) {
  // Create a new instance of the shift model
  var shift = new Shift();

  // Set the shift properties that came from the POST data
  shift.userId = req.user._id;
  shift.company = req.user.company;
  shift.storeAddress = req.user.storeAddress;
  shift.role = req.user.role;
  shift.text = req.body.text;
  shift.start_date = req.body.start_date;
  shift.end_date = req.body.end_date;

  // Save the shift and check for errors
  shift.save(function(err) {
    if (err){
      res.send(err);
    } else {
      res.json(shift);
    }
  });
};

// Create endpoint /api/shifts for GET
exports.getShifts = function(req, res) {
  // Use the shift model to find all shift
  Shift.find({ company: req.user.company }, function(err, shifts) {
    if (err) 
      res.send(err);
    for(var i = 0; i < shifts.length; i++) {
      shifts[i].id = shifts[i]._id;
    }
    res.json(shifts);
  });
};

// Create endpoint /api/shifts/:shift_id for GET
exports.getShiftsbyUser = function(req, res) { 
  // Use the shift model to find a specific shift
  Shift.find({ userId: req.user._id }, function(err, shift) {
    if (err)
      res.send(err);

    res.json(shift);
  });
};

// Create endpoint /api/shifts/:shift_id for PUT
exports.putShift = function(req, res) {
  // Use the shift model to find a specific shift
  Shift.findOne({ userId: req.user._id, _id: req.params.shift_id }, function(err, shift) {
    if (err) {
      res.send(err);
    }
    // Update the existing shift info
    shift.start_date = req.body.start_date;
    shift.end_date = req.body.end_date;
    shift.text = req.body.text;

    // Save the shift and check for errors
    shift.save(function(err) {
      if (err) {
        res.send(err);
      } else {
        res.json(shift);
      }
    });
  });
};


// Create endpoint /api/shifts/:shift_id for DELETE
exports.deleteShift = function(req, res) {
  // Use the shift model to find a specific shift and remove it

  Shift.remove({ _id: req.params.shift_id }, function(err) {
    if (err) {
      res.send(err);
    } else {
      res.json("Shift successfully deleted!");
    }
    
  });
};