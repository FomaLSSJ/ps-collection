var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    mongoosePaginate = require('mongoose-paginate');
    
var release = Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['physical', 'digital'],
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    region: {
        type: String,
        enum: ['eu', 'us', 'jp', 'as'],
        required: true
    },
    platform: {
        type: String,
        enum: ['ps3', 'ps4'],
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    code: {
        type: String
    },
    game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'game'
    }
});

release.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

release.plugin(mongoosePaginate);

var game = require('./game').gameModel;

var releaseModel = mongoose.model('release', release);
module.exports.releaseModel = releaseModel;