let movieHelper = require('./movie_helper');

let movies = [];
let job_array = [];

exports.addJob = movie => {
  job_array.push(movie);
}


exports.startGeoCoding = callback => {
  let movie = job_array.pop();

  if (!movie) {
    console.log('finish geocoding');
    return callback(movies);
  }
  movies.push(movie);
  getCoords(movie, callback);
}


const getCoords = (movie, callback) => {
  movieHelper.getLatLng(movie.clean_address)
  .then(data => {
    if (data.results.length) {
      movie.lat = data.results[0].geometry.location.lat;
      movie.lng = data.results[0].geometry.location.lng;
    } else {
      console.log('geocoding return no address');
    }
  })
  .then(() => {
    // call next job after a small wait for rate limits
    setTimeout(() => {
      exports.startGeoCoding(callback);
    }, 2000)
  })
  .catch(err => {
    console.log('error geocoding');
  })
}
