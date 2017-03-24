// let fetch = require('node-fetch')
// let db = require('../db');
// let ObjectId = require('mongodb').ObjectId;
// let geoCodeJob = require('./geocode_job');
// let movieHelper = require('../utilities/movie_helper');
//
//
// exports.checkForContentUpdate = function() {
//   db.connect('mongodb://localhost:27017/sf_movies', function(err) {
//     if (err) {
//       console.log('unable to connect to Mongo');
//       process.exit(1);
//     } else {
//       updateContent();
//     }
//   })
// }
//
//
// const updateContent = () => {
//   let last_update_date = movieHelper.getLastUpdateDate()
//   let last_record_date = movieHelper.getLastRecord()
//
//   Promise.all([last_update_date, last_record_date])
//   .then(date_array => {
//     if (date_array[0] > date_array[1]) {
//       console.log('need update');
//       getNewContent();
//       geocode();
//       saveToDatabase();
//     } else {
//       console.log('content up to date');
//     }
//   })
//   .catch(err => {
//     console.log('error Checking for Update', err)
//   })
// }
//
// const getNewContent = () => {
//   movieHelper.getMovieData()
//   .then(movies => {
//     saveNextMovie(movies);
//   })
// }
//
// const saveNextMovie = movies => {
//   let movie = movies.pop();
//
//   if (!movie.locations) {
//     return saveNextMovie(movies);
//   }
//
//   movieHelper.getByTitle(movie.title)
//   .then(movie_record => {
//     if (movie_record) {
//       // save movies
//       // geo code work
//       movie = movieHelper.cleanAddress(movie);
//       geocoder.addJob(movie);
//       saveNextMovie(movies);
//     } else {
//         // stop process
//         geocoder.startGeoCoding(saveToDatabase)
//     }
//   })
// }
//
// const saveToDatabase = movies => {
//   let movie = movies.pop();
//
//   if (!movie) {
//     exit();
//   } else {
//     saveMovie(movie);
//   }
// }
//
//
// const saveMovie = movie => {
//   const title = movieHelper.parseTitle(movie);
//
//   movieHelper.getByTitle(title)
//   .then(movie_record => {
//     if (movie_record) {
//       createAddressOnly(movie_record, movie);
//     } else {
//       createMovieAndAddress(title, movie);
//     }
//     // save next movie (recursive call)
//     return saveToDatabase();
//   })
// }
//
//
// const createAddressOnly = (movie_record, movie) => {
//   return movieHelper.saveAddress(movie_record, movie)
//   .catch(err => {
//     console.log('address was not saved');
//   })
// }
//
//
// const createMovieAndAddress = (title, movie) => {
//   return movieHelper.createMovie(title, movie)
//   .then(movie_record => {
//     return movieHelper.saveAddress(movie_record, movie);
//   })
//   .catch(err => {
//     console.log('movie and address was not saved');
//   })
// }
