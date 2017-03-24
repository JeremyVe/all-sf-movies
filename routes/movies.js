let express = require('express');
let router = express.Router();
let movieModel = require('../models/movie');

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
