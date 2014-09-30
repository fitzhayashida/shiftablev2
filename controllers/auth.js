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

passport.use(new LocalStrategy(
  function(username, password, callback) {
    console.log("username="+username);
    console.log("password="+password);
    console.log('finding user...');

    User.findOne( { username: username }, function (err, user) {
      console.log('User is');
      console.log(user);
      if(err) console.log(err);
      if (err) { return callback(err); }
      // No user found with that email
      if (!user) { return callback(null, false); }

      // Make sure the password is correct
      user.verifyPassword(password, function (err, isMatch) {
        if (err) { return callback(err); }

        // Password did not match
        if (!isMatch) { return callback(null, false); }
        console.log('success');
        // Success
        return callback(null, user);
      });
    });
  }
));

// passport.use('local-reg', new LocalStrategy({
//     passReqToCallback : true
//   },
//   function(req, username, password, done) {
//     findOrCreateUser = function(){
//       // find a user in Mongo with provided username
//       User.findOne({'username':username},function(err, user) {
//         // In case of any error return
//         if (err){
//           console.log('Error in SignUp: '+err);
//           return done(err);
//         }
//         // already exists
//         if (user) {
//           console.log('User already exists');
//           return done(null, false, 
//              req.flash('message','User Already Exists'));
//         } else {
//           // if there is no user with that email
//           // create the user
//           var newUser = new User();
//           // set the user's local credentials
//           newUser.username = username;
//           newUser.password = createHash(password);
//           newUser.email = req.param('email');
//           newUser.firstName = req.param('firstName');
//           newUser.lastName = req.param('lastName');
 
//           // save the user
//           newUser.save(function(err) {
//             if (err){
//               console.log('Error in Saving user: '+err);  
//               throw err;  
//             }
//             console.log('User Registration successful');    
//             return done(null, newUser);
//           });
//         }
//       });
//     };
     
//     // Delay the execution of findOrCreateUser and execute 
//     // the method in the next tick of the event loop
//     process.nextTick(findOrCreateUser);
//   })


exports.isAuthenticated = passport.authenticate('local', { failureRedirect: '/users' });


