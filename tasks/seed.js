var movies = require('../data/movies.json');
var db = require('../db');
var ObjectId = require('mongodb').ObjectId;

const seedDatabase = () => {
  db.connect('mongodb://localhost:27017/sf_movies', function(err) {
    if (err) {
      console.log('unable to connect to Mongo');
      process.exit(1);
    }
    resetDatabase();
    saveMovies();
  })
}

const saveMovies = () => {
  // recursion
  saveNextMovie();
}

const saveNextMovie = () => {
  let movie = movies.pop();

  if (!movie) {
    console.log('finish seeding');
    db.close();
    process.exit();
  } else {
    saveMovie(movie);
  }
}


const saveMovie = movie => {
  const title = parseTitle(movie);
  db.get().collection('movies').findOne({title: title})
  .then(function(record) {
    if ( record ) {
      createAddressOnly(title, movie);
    } else {
      createMovieAndAddress(title, movie);
    }
    // save next movie (recursive call)
    return saveNextMovie();
  })
}


const parseTitle = movie => {
  let index = movie.title.toLowerCase().indexOf('season');
  if ( index > -1) {
    return movie.title.substring(0, index).replace(/[,|-]/, '').trim();
  }
  return movie.title;
}


const createAddressOnly = (title, movie) => {
  db.get().collection('movies').findOne({title: title})
  .then(function(record) {
    return saveAddress(record, movie);
  })
  .catch(err => {
    console.log('didnt save movie');
  })
}


const createMovieAndAddress = (title, movie) => {
  db.get().collection('movies').insertOne({title: title, writer: movie.writer,
                                           release_year: movie.release_year, production_company: movie.production_company,
                                           director: movie.director, actor_1: movie.actor_1, actor_2: movie.actor_2,
                                           actor_3: movie.actor_3})
  .then(function(record) {
    return saveAddress(record, movie);
  })
  .catch(err => {
    console.log('didnt save movie');
  })
}


const saveAddress = (record, movie) => {
  return db.get().collection('locations').insertOne({
    title: movie.title,
    address: movie.locations,
    fun_facts: movie.fun_facts,
    lat: movie.lat,
    lng: movie.lng,
    movie_id: ObjectId(record._id)
  })
}

const resetDatabase = () => {
  db.get().collection('movies').remove({});
  db.get().collection('locations').remove({});
}

seedDatabase();
