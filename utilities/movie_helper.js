let fetch = require('node-fetch');
var config = require('../config');
let Movie = require('../models/movie');
let Location = require('../models/location');


exports.getLastUpdateDate = () => {
  return fetchMovieData()
  .then(response => response.headers._headers['x-soda2-truth-last-modified'][0])
  .catch(err => {
    console.log('error fetching new data', err)
  })
}


exports.getMovieData = () => {
  return fetchMovieData()
  .then(response => response.json())
}


exports.getLatLng = address => {
  const uri = config.GOOGLE_GEOCODE_API;
  const bound = '37.703576,-122.514381|37.811064,-122.359200';
  const key = config.GOOGLE_API_KEY;
  return fetch(`${uri}address=${address}&bounds=${bound}&key=`)
  .then(data => data.json())
}


exports.getLastRecord = () => {
  return Movie.getLastMovie()
  .then(movie => movie._id.getTimestamp())
}


exports.cleanAddress = address => {

  // deal with addresses with 'between'
  // can add other checks, for example : 'from'
  if (address.indexOf('between') > -1) {
    const cut_index = address.indexOf('and');
    if (cut_index > -1) {
      return address.substring(0, cut_index).replace('between ', '').trim();
    }
  }
  return address;
}


exports.cleanTitle = title => {
  let index = title.toLowerCase().indexOf('season');
  if ( index > -1) {
    return title.substring(0, index).replace(/[,|-]/, '').trim();
  }
  return title;
}


exports.getByTitle = title => {
  return Movie.getByTitle(title);
}


exports.createLocation = (movie, callback) => {
  return Location.create(movie)
  .then(() => callback())
}


exports.createMovie = movie => {
  return Movie.create(movie);

}


const fetchMovieData = () => {
  return fetch(config.MOVIE_API)
}
