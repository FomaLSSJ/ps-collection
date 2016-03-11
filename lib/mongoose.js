var mongoose = require('mongoose'),
    schema =mongoose.Schema,
    config = require('./config');

mongoose.connect(config.get("mongoose:uri"));

var db = mongoose.connection;

db.on('error', function (err) {
    console.log('\x1b[33mError');
});

db.once('open', function callback() {
    console.log('\x1b[35mOpen');
});

var user = new schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

var userModel = mongoose.model('user', user);
module.exports.userModel = userModel;