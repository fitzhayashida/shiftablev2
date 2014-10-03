// Load required packages
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findOne({ _id: id }, function (err, user) {
      done(null, user);
    })
});

passport.use('local-login', new LocalStrategy(
  function(username, password, callback) {

    User.findOne( { username: username }, function (err, user) {

      if (err) { return callback(err); }
      // No user found with that email
      if (!user) { return callback(null, false); }

      // Make sure the password is correct
      user.verifyPassword(password, function (err, isMatch) {
        if (err) { return callback(err); }

        // Password did not match
        if (!isMatch) { return callback(null, false); }

        // Success
        return callback(null, user);
      });
    });
  }
));

// passport.use('local-signup', new LocalStrategy(
//   function(){
//     var user = new User({
//       username: req.body.username,
//       name: {
//         first: req.body.first,
//         last: req.body.last
//       },
//       email: req.body.email,
//       company: req.body.company,
//       storeAddress: {
//         street: req.body.street,
//         city: req.body.city,
//         province: req.body.province,
//         postalCode: req.body.postalCode
//       },
//       role: req.body.role,
//       password: req.body.password
//     });

//     user.save(function(err) {
//       if (err){
//         res.send(err);
//       } else {
//         res.json({ message: 'User successfully created' });
//       }
//     });
// })

exports.isAuthenticated = passport.authenticate('local', { failureRedirect: '/users' });


