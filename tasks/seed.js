let movies = require('../data/movies.json');
let db = require('../db');
let movieHelper = require('../utilities/movie_helper');
let config = require('../config');
let async = require('async');

const seedDatabase = () => {
  db.connect(config.DB_HOST, function(err) {
    if (err) {
      console.log('unable to connect to Mongo');
      process.exit(1);
    }
    resetDatabase();
    saveMovies();
  })
}


const saveMovies = () => {
  async.forEachSeries(movies, function(movie, callback) {
    saveMovie(movie, callback)
  }, function(err) {
    if (err) return console.log('error', err);
    exit();
  })
}


const saveMovie = (movie, callback) => {
  movie.clean_title = movieHelper.cleanTitle(movie.title);

  movieHelper.getByTitle(movie.clean_title)
  .then(movie_record => {
    if (movie_record) {
      movie.id = movie_record._id;
      createLocationOnly(movie, callback);
    } else {
      createMovieAndLocation(movie, callback);
    }
  })
}


const createLocationOnly = (movie, callback) => {
  return movieHelper.createLocation(movie, callback);
}


const createMovieAndLocation = (movie, callback) => {
  return movieHelper.createMovie(movie)
  .then(movie_record => {
    movie.id = movie_record.insertedId;
    return movieHelper.createLocation(movie, callback);
  })
}


const resetDatabase = () => {
  db.get().collection('movies').remove({});
  db.get().collection('locations').remove({});
}


const exit = () => {
  console.log('finish seeding :)');
  db.close();
  process.exit();
}


seedDatabase();
