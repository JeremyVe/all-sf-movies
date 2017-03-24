'use strict';

const db = require('../db');
const ObjectId = require('mongodb').ObjectId;
const Location = require('./location');

exports.getAll = () => {
  return db.get().collection('movies').find({}, {title: 1}).toArray();
}


exports.getMovie = id => {
  const movie_id = new ObjectId(id)
  let movie = db.get().collection('movies').findOne({_id: movie_id});
  let locations = Location.getLocations(movie_id)
  return Promise.all([movie, locations])
  .then(result => {
    return {movie: result[0], locations: result[1]}
  })
}


exports.create = movie => {
  return db.get().collection('movies').insertOne({title: movie.clean_title, writer: movie.writer,
                                           release_year: movie.release_year, production_company: movie.production_company,
                                           director: movie.director, actor_1: movie.actor_1, actor_2: movie.actor_2,
                                           actor_3: movie.actor_3})
         .catch(err => console.log('movie was not saved', err))
}


exports.getLastMovie = () => {
   return db.get().collection('movies').find({}).sort({_id: -1}).limit(1).next()
   .catch(err => {
     console.log('error fetching last record', err)
   })
}


exports.getByTitle = title => {
  return db.get().collection('movies').findOne({title: title})
  .catch(err => {
    console.log('error fetching movie by title', err)
  })
}
