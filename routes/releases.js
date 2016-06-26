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

router.get('/:platform/:page', function(req, res, next) {
    if (req.params.platform === 'all') {
        releaseModel.paginate({}, {page: req.params.page, limit: 1, populate: 'game', sort: {title: 1}}, function(err, releases) {
            if (!err) {
                return res.send({status: true, releases: releases});
            } else {
                return res.send({status: false, response: {message: 'Model get error', name: 'Model'}});
            }
        });
    } else {
        releaseModel.paginate({platform: req.params.platform}, {page: req.params.page, limit: 1, populate: 'game', sort: {title: 1}}, function(err, releases) {
            if (!err) {
                return res.send({status: true, releases: releases});
            } else {
                return res.send({status: false, response: {message: 'Model get error', name: 'Model'}});
            }
        });
    }
});

module.exports = router;