var express = require('express'),
    router = express.Router(),
    Game = require('../model/game'),
    Release = require('../model/release');
    
var gameModel = Game.gameModel;
var releaseModel = Release.releaseModel;

router.post('/create', function(req, res, next) {
    var release = new releaseModel({
        title: req.body.title,
        type: req.body.type,
        publisher: req.body.publisher,
        region: req.body.region,
        platform: req.body.platform,
        date: req.body.date,
        code: req.body.code,
        game: req.body.game
    });
    
    release.save(function(err, release) {
        if (!err) {
            return res.send({status: true, release: release});
        } else {
            return res.send({status: false, error: err});
        }
    });
});

router.get('/:platform/:limit', function(req, res, next) {
    if (req.params.platform === 'all') {
        releaseModel.find({}, null, {limit: req.params.limit}).populate('game').exec(function(err, releases) {
            if (!err) {
                return res.send({status: true, releases: releases});
            } else {
                return res.send({status: false, response: {message: 'Model get error', name: 'Model'}});
            }
        });
    } else {
        releaseModel.find({platform: req.params.platform}, null, {limit: req.params.limit}).populate('game').exec(function(err, releases) {
            if (!err) {
                return res.send({status: true, releases: releases});
            } else {
                return res.send({status: false, response: {message: 'Model get error', name: 'Model'}});
            }
        });
    }
});

module.exports = router;