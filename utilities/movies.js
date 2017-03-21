var fetch = require('node-fetch');

const fetchMovieData = () => {
    return fetch('https://data.sfgov.org/resource/wwmu-gmzc.json')
}

exports.getLastUpdateDate = () => {
  return fetchMovieData()
  .then(response => response.headers._headers['x-soda2-truth-last-modified'][0])
}

exports.getMovieData = () => {
  return fetchMovieData()
  .then(response => response.json())
}
