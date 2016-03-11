var express = require('express');
var router = express.Router();

var userModel = require('../lib/mongoose').userModel;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function (req, res, next) {
  var user = new userModel({
    name: req.body.name
  });

  user.save(function(err) {
    if (!err) {
      return res.send('User created');
    } else {
      return res.send('Error');
    }
  });
});

module.exports = router;
