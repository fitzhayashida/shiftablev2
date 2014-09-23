// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var shiftController = require('./controllers/shift');
var userController = require('./controllers/user');
var authController = require('./controllers/auth');


// Connect to the user MongoDB
mongoose.connect('mongodb://localhost:27017/test');

// Create our Express application
var app = express();

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

// Use the passport package in our application
app.use(passport.initialize());

// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// Create our Express router
var router = express.Router();

// Create endpoint handlers for /shifts
router.route('/shifts')
  .post(shiftController.postShifts)
  .get(shiftController.getShifts);

// Create endpoint handlers for /shifts/:shift_id
router.route('/shifts/:shift_id')
  .get(shiftController.getShift)
  .put(shiftController.putShift)
  .delete(shiftController.deleteShift);

// Create endpoint handlers for /users
router.route('/users')
  .post(userController.postUsers)
  .get(authController.isAuthenticated, userController.getUsers);


// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public')); 

// Register all our routes with /api
app.use('/api', router);

// route to handle all angular requests
app.get('*', function(req, res) {
  res.sendfile('./public/index.html'); // load our public/index.html file
});


// Start the server
app.listen(port);
console.log('Listening on port ' + port);