'use strict';

const fetch = require('node-fetch');
const writer = require('../utilities/json_writer');
const geocoder = require('../utilities/geocoder');
const movieHelper = require('../utilities/movie_helper');


const createSeedData = function() {
  movieHelper.getMovieData()
  .then(movies => movies.filter(movie => movie.locations))
  .then(movies => cleanAddresses(movies))
  .then(movies => geocode(movies))
  .catch(err => {
    console.log('error fetching movies data', err)
  })
}


const geocode = movies => {
  geocoder.startGeoCoding(movies, writeToJson);
}


const cleanAddresses = movies => {
  return movies.map(movie => {
    movie.clean_address = movieHelper.cleanAddress(movie.locations)
    return movie;
  })
}


const writeToJson = movies => {
  writer.write(movies)
}


createSeedData();
