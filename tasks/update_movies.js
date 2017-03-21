var fetch = require('node-fetch')
var db = require('../db');
var ObjectId = require('mongodb').ObjectId;
var geoCodeJob = require('./geocode_job');

exports.checkForContentUpdate = function() {
  db.connect('mongodb://localhost:27017/sf_movies', function(err) {
    if (err) {
      console.log('unable to connect to Mongo');
      process.exit(1);
    } else {

      let lastUpdateDate = fetchMovies()
      .catch(err => {
        console.log('error fetching new data', err)
      })

      let lastRecordDate = db.get().collection('movies').find({}).sort({_id: -1}).limit(1).next()
      .then(movie => movie._id.getTimestamp())
      .catch(err => {
        console.log('error fetching last record', err)
      })

      Promise.all([lastUpdateDate, lastRecordDate])
      .then(dateArray => {
        if (dateArray[0] > dateArray[1]) {
          console.log('need update');
          getNewContent();
          geocode();
          saveToDatabase();
        } else {
          console.log('content up to date');
        }
      })
      .catch(err => {
        console.log('error Checking for Update', err)
      })
    }
  })
}


const fetchMovies = () => {
  return fetch('https://data.sfgov.org/resource/wwmu-gmzc.json')
  .then(response => response.headers._headers['x-soda2-truth-last-modified'][0])
}




const saveMoviesToDatabase = () => {
  // recursive call (dealing with async read/write)
  let movie = moviesList.pop();

  // start getting lat/lng when no more movies
  if (!movie) return geoCodeJob.startGetCoordsJob();

  // skip to next movie if no address present, + log
  if (!movie.locations) return saveMoviesToDatabase();

  createMovieRecord(movie);
}

const createMovieRecord = movie => {
  let title = parseTitle(movie);
  saveMovie(title, movie);
}


const parseTitle = movie => {
  let index = movie.title.toLowerCase().indexOf('season');
  if ( index > -1) {
    return movie.title.substring(0, index).replace(/[,|-]/, '').trim();
  }
  return movie.title;
}


const saveMovie = (title, movie) => {
  db.get().collection('movies').findOne({title: title})
  .then(function(record) {
    if ( record ) {
      createAddressOnly(title, movie);
    } else {
      createMovieAndAddress(title, movie);
    }
    // save next movie (recursive call)
    return saveMoviesToDatabase();
  })
}


const createAddressOnly = (title, movie) => {
  db.get().collection('movies').findOne({title: title})
  .then(function(record) {
    return saveAddress(record, movie);
  })
  .then(function(location) {
    geoCodeJob.addJob({id: location.insertedId, address: movie.locations})
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
  .then(function(location) {
    geoCodeJob.addJob({id: location.insertedId, address: movie.locations})
  })
}


const saveAddress = (record, movie) => {
  return db.get().collection('locations').insertOne({
    title: movie.title,
    address: movie.locations,
    movie_id: ObjectId(record._id)
  })
}
