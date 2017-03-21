var fetch = require('node-fetch');
var db = require('../db');
var fs = require('fs');
var csvWriter = require('csv-write-stream')
var path = require('path')
var log_path = path.join(__dirname, '..', 'data', 'lat_lng.csv');
var stream = fs.createWriteStream(log_path, {flags: 'a'});
var writer = csvWriter({headers: ['id', 'address', 'error']});
writer.pipe(stream);

let jobs = []

exports.addJob = function(job) {
  jobs.push(job);
}

exports.startGetCoordsJob = function() {
  console.log('start geocoding')
  getCoords();
}

var getCoords = function() {
  console.log('coord job start');
  var job = jobs.pop();

  if (!job) return;

  fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${job.address}&bounds=37.703576,-122.514381|37.811064,-122.359200&key=AIzaSyANdIymh7mE0y8niwXKeakSukJb0dHPOE8`)
  .then(data => data.json())
  .then(data => {
    console.log('get data');
    if (data.results.length) {
      db.get().collection('locations').update({_id: job.id}, { $set: {'lat': data.results[0].geometry.location.lat,
                                                           'lng': data.results[0].geometry.location.lng} })

      console.log('address geocoded');
    } else {
      console.log('address geocode fail')
      writeToCsv({id: job.id, address: job.address, error: 'address returning empty results'})
    }
  })
  .then(function() {

    setTimeout(function() {
      getCoords();
    }, 2000)
  })
  .catch(err => {
    console.log('error getting coords', err)
    writeToCsv({id: job.id, address: job.address, error: 'error geocoding'})
  })
}


const writeToCsv = (job) => {
  writer.write(job)
}
