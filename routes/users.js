var express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

var userModel = require('../model/user').userModel;

passport.use(new LocalStrategy(function(username, password, done) {
  process.nextTick(function() {
    userModel.findOne({
      username: username
    }, function(err, user) {
      if (err) {
        return done(err);
      } else if (!user) {
        return done(null, false);
      } else if (user.isValidPassword(password)) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  });
}));

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create', function (req, res, next) {
  var user = new userModel({
    username: req.body.username
  });
  user.setPassword(req.body.password);

  user.save(function(err) {
    if (!err) {
      return res.send({'status':true,'response': {message: 'user created', name:'Model'}});
    } else if (err.name == 'ValidationError') {
        return res.send({status: false, 'response': {message: 'Validation error', name:'Valid'}});
    } else if (err.code == 11000) {
        return res.send({status: false, response: {message: 'Username exist', name:'Model'}});
    } else {
        return res.send({status: false, response: {message:'Failed', name: 'Error'}});
    }
  });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/users/success',
  failureRedirect: '/users/failure'
}));

router.get('/success', function(req, res, next) {
    return res.send({status: true, response:{ message: 'Successfully authenticated'}});
});

router.get('/failure', function(req, res, next) {
    return res.send({status: false, response:{ message: 'Failed to authenticate'}});
});

router.get('/logout', function(req, res) {
    req.session.destroy();
    return res.send({status: true, response: {message: 'You logout'}});
});

module.exports = router;
