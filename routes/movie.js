const express = require('express');
const router = express.Router();
const movieModel = require('../models/movie');


router.get('/:id', function(req, res, next) {
  const id = req.params.id;
  movieModel.getMovie(id)
  .then(function(locations) {
    res.json(locations);
  })
})

module.exports = router;
