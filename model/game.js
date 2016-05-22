var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
var game = Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    developer: {
        type: String,
        required: true
    },
    genre: {
        type: Array,
        required: true
    }
});

game.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

var gameModel = mongoose.model('game', game);
module.exports.gameModel = gameModel;