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


exports.isAuthenticated = passport.authenticate('local', { failureRedirect: '/users' });


