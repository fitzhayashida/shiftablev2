// Load required packages
var Shift = require('../models/shift');

// Create endpoint /api/shifts for POSTS
exports.postShifts = function(req, res) {
  // Create a new instance of the shift model
  var shift = new Shift();

  // Set the shift properties that came from the POST data
  shift.storeId = req.user._storeId;
  shift.userId = req.user._id;
  shift.startOfShift = req.body.startOfShift;
  shift.endOfShift = req.body.endOfShift;

  // Save the shift and check for errors
  shift.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Shift has been created!', data: shift });
  });
};

// Create endpoint /api/shifts for GET
exports.getShifts = function(req, res) {
  // Use the shift model to find all shift
  Shift.find({ userId: req.user._id }, function(err, shifts) {
    if (err)
      res.send(err);

    res.json(shifts);
  });
};

// Create endpoint /api/shifts/:shift_id for GET
exports.getShift = function(req, res) {
  // Use the shift model to find a specific shift
  Shift.find({ userId: req.user._id, _id: req.params.shift_id }, function(err, shift) {
    if (err)
      res.send(err);

    res.json(shift);
  });
};

// Create endpoint /api/shifts/:shift_id for PUT
exports.putShift = function(req, res) {
  // Use the shift model to find a specific shift
  Shift.update({ userId: req.user._id, _id: req.params.shift_id }, function(err, shift) {
    if (err)
      res.send(err);

    // Update the existing shift quantity
    shift.startOfShift = req.body.startOfShift;
    shift.endOfShift = req.body.endOfShift;

    // Save the shift and check for errors
    shift.save(function(err) {
      if (err)
        res.send(err);

      res.json(shift);
    });
  });
};

// Create endpoint /api/shifts/:shift_id for DELETE
exports.deleteShift = function(req, res) {
  // Use the shift model to find a specific shift and remove it
  Shift.remove({ userId: req.user._id, _id: req.params.shift_id }, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Shift has been removed!' });
  });
};