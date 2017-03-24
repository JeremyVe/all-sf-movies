let db = require('../db');
let ObjectId = require('mongodb').ObjectId;


exports.getLocations = movie_id => {
  return db.get().collection('locations').find({movie_id: movie_id}).toArray();
}

exports.create = movie => {
  return db.get().collection('locations').insertOne({
    title: movie.title,
    address: movie.locations,
    fun_facts: movie.fun_facts,
    lat: movie.lat,
    lng: movie.lng,
    movie_id: ObjectId(movie.id)
  })
  .catch(err => console.log('address was not saved', err))
}
