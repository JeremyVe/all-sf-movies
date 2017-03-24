const Movie = require('../../models/movie');
const db = require('..//../db');
const async = require('async');
const ObjectId = require('mongodb').ObjectId;
const config = require('../../config');
const mocha = require('mocha');
const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

describe('Movie', function() {

  let id = ObjectId();
  let other_id = ObjectId();

  before(function(done) {
    db.connect(config.DB_HOST, done)
  })

  beforeEach(function(done) {
    async.series([
      (callback) => db.get().collection('movies').remove({}, callback),
      (callback) => db.get().collection('locations').remove({}, callback),
      (callback) => db.get().collection('movies').insertOne({title: 'movie title', _id: id}, callback),
      (callback) => db.get().collection('movies').insertOne({title: 'other movie title', _id: other_id}, callback),
      (callback) => db.get().collection('locations').insertOne({address: '10 north street', movie_id: id}, callback),
      (callback) => db.get().collection('locations').insertOne({address: '15 south street', movie_id: other_id}, callback),
    ],
      done
    )
  })

  describe('#getAll', function() {

    it('should return a list of all the movies', function() {
      Movie.getAll()
      .then(function(movies) {
        expect(movies.length).to.equal(2)
      })
    })

    it('should return an id and title as movie properties', function() {
      Movie.getAll()
      .then(function(movies) {
        let movie = movies[0];
        expect(Object.keys(movie).length).to.equal(2);
        expect(movie.hasOwnProperty('title')).to.equal(true)
        expect(movie.hasOwnProperty('_id')).to.equal(true)
      })
    })
  })


  describe('#getMovie', function() {
    it('should return the movie and locations of the movie', function() {
      Movie.getMovie(id)
      .then(function(movie) {
        expect(Object.keys(movie).length).to.equal(2)
        expect(movie.hasOwnProperty('movie')).to.equal(true)
        expect(movie.hasOwnProperty('locations')).to.equal(true)
      })
    })
  })


  describe('#create', function() {
    it('should add a new movie to database', function() {
      let movie = {title: 'title', writer: 'author',
                   release_year: 'release_year', production_company: 'production_company',
                   director: 'director', actor_1: 'actor_1', actor_2: 'actor_2',
                   actor_3: 'actor_3'}
      Movie.create(movie)
      .then(function(movie) {
        return db.get().collection('movies').find({}).count()
      })
      .then(function(movies) {
        expect(movies).to.equal(3)
      })
    })
  })


  describe('#getLastMovie', function() {
    it('should get the last movie in database', function() {
      Movie.getLastMovie()
      .then(function(movie) {
        expect(movie.title).to.equal('other movie title')
      })
    })
  })


  describe('#getByTitle', function() {
    it('should get the last movie in database', function() {
      let title = 'movie title'
      Movie.getByTitle(title)
      .then(function(movie) {
        expect(movie._id).to.eql(id)
      })
    })
  })
})
