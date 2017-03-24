let Location = require('../../models/location');
let db = require('..//../db');
let async = require('async');
let ObjectId = require('mongodb').ObjectId;
let config = require('../../config');
let mocha = require('mocha');
let chai = require('chai');
let sinon = require('sinon');
let expect = chai.expect;

describe('Location', function() {
  let id = ObjectId();
  let other_id = ObjectId();

  before(function(done) {
    db.connect(config.DB_HOST, done)
  })

  beforeEach(function(done) {
    async.series([
      (callback)=> db.get().collection('movies').remove({}, callback),
      (callback)=> db.get().collection('locations').remove({}, callback),
      (callback)=> db.get().collection('movies').insertOne({title: 'movie title', _id: id}, callback),
      (callback)=> db.get().collection('movies').insertOne({title: 'movie title', _id: other_id}, callback),
      (callback)=> db.get().collection('locations').insertOne({address: '10 north street', movie_id: id}, callback),
      (callback)=> db.get().collection('locations').insertOne({address: '15 south street', movie_id: other_id}, callback),
    ],
      done
    )
  })


  describe('#getLocations', function() {
    it('should return all the locations of a movie', function() {
      Location.getLocations(id)
      .then(function(locations) {
        expect(locations.length).to.equal(1)
      })
    })
  })


  describe('#create', function() {
    it('should create a new location with the movie id', function() {
      let new_id = ObjectId();
      movie = {title: 'sf', address: 'an address in sf', id: new_id};
      Location.create(movie)
      .then(function(location) {
        db.get().collection('locations').find({}).sort({_id: -1}).limit(1).next()
        .then(function(location) {
          expect(location.movie_id).to.eql(new_id)
        })
      })
    })
  })
})
