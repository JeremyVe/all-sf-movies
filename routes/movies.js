var express = require('express');
var router = express.Router();
var movieModel = require('../models/movie');

router.get('/', function(req, res, next) {
  movieModel.getAll()
  .then(function(movies) {
    res.json(movies)
  })
})

module.exports = router;
