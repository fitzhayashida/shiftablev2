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
      lat: req.body.lat,
      lng: req.body.lng
    },
    role: req.body.role,
    password: req.body.password
  });

  user.save(function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log('user: ' + user.email + " saved.");
      req.login(user, function(err) {
        if (err) {
          console.log(err);
        }
        return res.redirect('/users');
      });
    }
  });
};

// Create endpoint /api/users for GET
exports.getUsers = function(req, res) {
  User.find({}, function(err, users) {
    if (err) {
      res.send(err);
    } else {
    res.json(users);
  }
  });
};

// Create endpoint /api/users/:user_id for DELETE
exports.deleteUser = function(req, res) {
  User.remove({ _id: req.params.user_id }, function(err) {
    if (err) {
      res.send(err);
    } else {
      res.json("User successfully deleted!");
    }
  });
};

