var express = require('express');
var router = express.Router();
var movieModel = require('../models/movie');


router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  movieModel.getMovie(id)
  .then(function(locations) {
    res.json(locations);
  })
})

module.exports = router;
