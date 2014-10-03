var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var User = require('../models/user');

exports.contact = function(req, res){

  var userId = req.body._id;

  User.findOne({ _id: userId }, function(err, user) {
    if (err) {
      res.send(err);
    } else {
      console.log(user);

    var fromName = req.user.name.first;
    var fromEmail = req.user.email;
    var toName = user.name.first;
    var toEmail = user.email;
    var message = "Hello " + toName + ", " + fromName + " would like to take your shift, Please contact him/her at " + fromEmail;

    var smtpTransport = nodemailer.createTransport("SMTP",{
        service: "Gmail",
        auth: {
            user: "get.shiftable@gmail.com",
            pass: "Lighthouse1234"
        }
    });

    var mailOptions = {
        from: fromEmail,
        to: toEmail, 
        subject: toName + ', you have a new message from Shiftable!',
        text: message
    }

    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
          console.log(error);
        } else{
          console.log(response);
          res.redirect('/shifts');
        }
      });
    }  
  });
}
