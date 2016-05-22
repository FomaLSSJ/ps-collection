var express = require('express'),
    router = express.Router();
    
var gameModel = require('../model/game').gameModel;

router.post('/create', function(req, res, next) {
    var game = new gameModel({
        title: req.body.title,
        developer: req.body.developer,
        genre: req.body.genre
    });
    
    game.save(function(err, game) {
        if (!err) {
            return res.send({status: true, game: game});
        } else {
            return res.send({status: false, error: err});
        }
    });
});

router.get('/get/:id', function(req, res, next) {
    gameModel.findById(req.params.id, function(err, game) {
        if (!err) {
            return res.send({status: true, game: game});
        } else {
            return res.send({status: false, error: err});
        }
    });
});

router.get('/find', function(req, res, next) {
    gameModel.find({title: new RegExp(req.query.q, 'i')}, null, {limit: 10}, function(err, games) {
        if (!err) {
            if (req.query.f == 'semantic') {
                if (games != null) {
                    var response = [];
                    for (var i = 0; i < games.length; i++) {
                        response.push({
                            value: games[i].id,
                            name: games[i].title
                        });
                    }
                    return res.send({success: true, results: response});
                } else {
                    return res.send({success: false, results: null});
                }
            }
            return res.send({status: true, game: games});
        } else {
            return res.send({status: false, error: err});
        }
    });
});

module.exports = router;