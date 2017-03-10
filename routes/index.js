var express = require('express');
var router = express.Router();

var db = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
  var food = db.get().collection('movies').find().toArray(function(err, docs) {
    console.log(docs);
  })
  res.render('index', { title: 'Express' });
});

module.exports = router;
