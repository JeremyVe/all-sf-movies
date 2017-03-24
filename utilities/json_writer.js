'use strict';

const fs = require('fs');
const path = require('path');
const FILE_PATH = path.join(__dirname, '..', 'data', 'movies.json');

exports.write = movies => {
  const data = JSON.stringify(movies, null, '\t');

  fs.writeFile(FILE_PATH, data, function(err, data) {
    if (err) {
      console.log('error writing data to json file', err)
    }
    console.log('data saved to movies.json !');
  })
}
