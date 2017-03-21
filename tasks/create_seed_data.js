var fetch = require('node-fetch');
var fs = require('fs');
var path = require('path');
var jsonFilePath = path.join(__dirname, '..', 'data', 'movies.json');

var geocodejobs = [];
var cleanMovies = [];

const createSeedData = function() {
  fetchMovies()
  .then(movies => {
    geocode(movies);
  })
  .catch(err => {
    console.log('error fetching movies data', err)
  })
}

const fetchMovies = () => {
  return fetch('https://data.sfgov.org/resource/wwmu-gmzc.json')
  .then(response => response.json())
}

const geocode = movies => {
  
  movies.forEach(movie => {
    if (movie.locations) { // take off movies without address
      cleanAddress(movie);
      addGeoCodingJob(movie);
    }
  })
  startGeoCodingJob();
}


const cleanAddress = movie => {
  if (movie.locations.indexOf('between') > -1) {
    const cutIndex = movie.locations.indexOf('and');
    if (cutIndex > -1) {
      const clean_address = movie.locations.substring(0, cutIndex).replace('between', '').trim();
      movie.clean_address = clean_address;
    }
  } else {
    movie.clean_address = movie.locations;
  }
  return movie;
}


const addGeoCodingJob = movie => {
  geocodejobs.push(movie);
}

const startGeoCodingJob = () => {
  let movie = geocodejobs.pop();

  if (!movie) {
    console.log('finish geocoding');
    return writeJsonToFile();
  }
  cleanMovies.push(movie);
  getCoords(movie);
}


const getCoords = movie => {
  fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${movie.clean_address}&bounds=37.703576,-122.514381|37.811064,-122.359200&key=AIzaSyANdIymh7mE0y8niwXKeakSukJb0dHPOE8`)
  .then(data => data.json())
  .then(data => {
    if (data.results.length) {
      movie.lat = data.results[0].geometry.location.lat;
      movie.lng = data.results[0].geometry.location.lng;
    } else {
      console.log('unmatching address');
      // Todo : log error
    }
  })
  .then(function() {
    setTimeout(function() {
      startGeoCodingJob();
    }, 2000)
  })
  .catch(err => {
    console.log('error geocoding');
  })
}


const writeJsonToFile = () => {
  fs.writeFile(jsonFilePath, JSON.stringify(cleanMovies, null, '\t'), function(err, data) {
    if (err) {
      console.log('error writing data to json file', err)
    }
    console.log('data saved to movies.json !');
  })
}


createSeedData();
