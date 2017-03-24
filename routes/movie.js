let express = require('express');
let router = express.Router();
let movieModel = require('../models/movie');


router.get('/:id', function(req, res, next) {
  let id = req.params.id;
  movieModel.getMovie(id)
  .then(function(locations) {
    res.json(locations);
  })
})

module.exports = router;
