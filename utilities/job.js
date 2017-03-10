var fetch = require('node-fetch')
var db = require('../db');

exports.fetchMovies = function() {
  // fetch('https://data.sfgov.org/resource/wwmu-gmzc.json')
  // .then((response) => response.json())
  // .then((data) => {
  //   saveMoviesToDb(data);
  // })
}

const saveMoviesToDb = function(data) {

  let prevMovie = '';

  data.forEach(movie => {
    if (prevMovie === movie.title) {
      console.log('saving address only');
      // save only the address
      const movieId = db.get().collection('movies').findOne({title: movie.title})._id;

      db.get().collection('locations').insertOne({
        address: movie.locations,
        movie_id: movieId
      })

    } else {
      console.log('saving movie and address');
      // save movie to database
      var newMovie = db.get().collection('movies').insertOne(
        {
          title: movie.title,
        }
      )

      db.get().collection('locations').insertOne(
        {
          address: movie.locations,
          movie_id: newMovie._id
        }
      )
      prevMovie = movie.title;

      // save address to database
    }
  })
}

const saveLocation = function(data) {

}
