var db = require('../db');
var ObjectId = require('mongodb').ObjectId;

exports.getAll = function() {
  return db.get().collection('movies').find().toArray();
}

exports.getMovie = function(id) {
  const objId = new ObjectId(id)
  let movie = db.get().collection('movies').findOne({_id: objId});
  let locations = db.get().collection('locations').find({movie_id: objId}).toArray();
  return Promise.all([movie, locations])
  .then(result => {
    console.log('result', result)
    return {movie: result[0], locations: result[1]}
  })
}
