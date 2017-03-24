const express = require('express');
const router = express.Router();
const movieModel = require('../models/movie');

router.get('/', function(req, res, next) {
  movieModel.getAll()
  .then(movies => {
    res.json(movies)
  })
  .catch(err => {
    res.render('error getting movies list');
  })
})

module.exports = router;
