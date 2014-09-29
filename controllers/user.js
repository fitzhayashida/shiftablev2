// Load required packages
var User = require('../models/user');

// Create endpoint /api/users for POST
exports.postUsers = function(req, res) {
  var user = new User({
    username: req.body.username,
    name: {
      first: req.body.first,
      last: req.body.last
    },
    email: req.body.email,
    company: req.body.company,
    storeAddress: {
      street: req.body.street,
      city: req.body.city,
      province: req.body.province,
      postalCode: req.body.postalCode
    },
    role: req.body.role,
    password: req.body.password
  });

  user.save(function(err) {
    if (err){
      res.send(err);
    } else {
      res.json({ message: 'User successfully created' });
    }
  });
};
// Create endpoint /api/users for GET
exports.getUsers = function(req, res) {
  User.find(function(err, users) {
    if (err)
      res.send(err);

    res.json(users);
  });
};

exports.deleteUser = function(req, res) {
  User.remove({ _id: req.params.user_id }, function(err) {
    if (err) {
      res.send(err);
    } else {
      res.json("User successfully deleted!");
    }
    
  });