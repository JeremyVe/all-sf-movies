'use strict';

const movieHelper = require('./movie_helper');
const async = require('async');


exports.startGeoCoding = (movies, callback) => {
  async.mapSeries(movies, getCoords, function(err, movies) {
    if (err) return console.log('err', err);

    callback(movies)
  } )
}


const getCoords = (movie, callback) => {
  movieHelper.getLatLng(movie.clean_address)
  .then(data => {
    return setLatLng(movie, data.results);
  })
  .then(movie => {
    setTimeout(() => { callback(null, movie) }, 2000)  // call next job after a small wait for rate limits
  })
  .catch(err => {
    console.log('error geocoding', err);
    callback(err, movie)
  })
}


const setLatLng = (movie, results) => {
  if (results.length) {
    movie.lat = results[0].geometry.location.lat;
    movie.lng = results[0].geometry.location.lng;
  } else {
    console.log('geocoding return no address', 'title', movie.title, 'locations', movie.locations);
  }
  return movie;
}
