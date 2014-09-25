// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var exphbs  = require('express-handlebars');
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

// Configure express to use handlebars templates
var hbs = exphbs.create({
    defaultLayout: 'main', 
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

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


//===============ROUTES=================
//displays our homepage
app.get('/', function (req, res){
  res.render('home');
});

//displays the shift page
app.get('/shifts', function (req, res){
  res.render('shifts');
});

app.get('/users', function (req, res){
  res.render('user');
});

//displays our signup page
app.get('/signin', function(req, res){
  res.render('signin');
});

//sends the request through our local signup strategy, and if successful takes user to homepage, otherwise returns then to signin page
app.post('/local-reg', passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/signin'
  })
);

//sends the request through our local login/signin strategy, and if successful takes user to homepage, otherwise returns then to signin page
app.post('/login', passport.authenticate('local-signin', { 
  successRedirect: '/',
  failureRedirect: '/signin'
  })
);

//logs user out of site, deleting them from the session, and returns to homepage
app.get('/logout', function(req, res){
  var name = req.user.username;
  console.log("LOGGIN OUT " + req.user.username)
  req.logout();
  res.redirect('/');
  req.session.notice = "You have successfully been logged out " + name + "!";
});

// Start the server
app.listen(port);
console.log('Listening on port ' + port);