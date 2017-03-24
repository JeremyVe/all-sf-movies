let express = require('express');
let router = express.Router();
let path = require('path');

let db = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
  //res.render('index', { title: 'Express' });
});

module.exports = router;
