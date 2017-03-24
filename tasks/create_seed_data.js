'use strict';

const fetch = require('node-fetch');
const writer = require('../utilities/json_writer');
const geocoder = require('../utilities/geocoder');
const movieHelper = require('../utilities/movie_helper');


const createSeedData = function() {
  movieHelper.getMovieData()
  .then(movies => geocode(movies))
  .catch(err => {
    console.log('error fetching movies data', err)
  })
}


const geocode = movies => {
  for (let i = 0; i < 10; i++) {
    let movie = movies[i];
  // movies.forEach(movie => {
    if (movie.locations) { // skip movies without addresses
      movie.clean_address = movieHelper.cleanAddress(movie.locations);
      geocoder.addJob(movie);
    }
  // })
  }
  geocoder.startGeoCoding(writeToJson);
}


const writeToJson = movies => {
  writer.write(movies)
}


createSeedData();
