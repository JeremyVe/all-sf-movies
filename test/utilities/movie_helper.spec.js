let movie_helper = require('../../utilities/movie_helper');
let mocha = require('mocha');
let chai = require('chai');
let sinon = require('sinon');
let expect = chai.expect;
let Movie = require('../../models/movie');
let Location = require('../../models/location');
let ObjectId = require('mongodb').ObjectId;

describe('#cleanAddress', function() {
  it('should clean an address with "between"', function() {
    let address = 'church between north street and east street';
    let clean_address = movie_helper.cleanAddress(address);

    expect(clean_address).to.equal('church north street');
  })

  it('should return the original address if it doesnt need change', function() {
    let address = 'church north street';
    let clean_address = movie_helper.cleanAddress(address);

    expect(clean_address).to.equal('church north street');
  })
})


describe('#cleanTitle', function() {
  it('should clean the title if "season" is present', function() {
    let title = 'Game of thrones season 2 episode 1';
    let clean_title = movie_helper.cleanTitle(title);

    expect(clean_title).to.equal('Game of thrones');
  })

  it('should return the original title if it doesnt need change', function() {
    let title = 'Game of thrones';
    let clean_title = movie_helper.cleanTitle(title);

    expect(clean_title).to.equal('Game of thrones');
  })
})


describe('#getByTitle', function() {
  it('should call Movie.getByTitle', function() {
    sinon.stub(Movie, 'getByTitle');
    var title = 'fake title';
    movie_helper.getByTitle(title);

    expect(Movie.getByTitle.callCount).to.equal(1);
  })
})


describe('#createLocation', function() {
  it('should call Location.create', function() {
    sinon.stub(Location, 'create').returns(new Promise((err) => {}, (location)=> {}));
    var location = {};
    movie_helper.createLocation(location);

    expect(Location.create.callCount).to.equal(1);
  })
})


describe('#createMovie', function() {
  it('should call Movie.create', function() {
    sinon.stub(Movie, 'create');
    var movie = {};
    movie_helper.createMovie(movie);

    expect(Movie.create.callCount).to.equal(1);
  })
})


describe('#getLastRecord', function() {

  before(function() {
    var movie = {_id: ObjectId("58d32761e219fa1014b851cf")}
    sinon.stub(Movie, 'getLastMovie').returns(Promise.resolve(movie));
  })

  it('should call Movie.getLastMovie', function() {
    movie_helper.getLastRecord();

    expect(Movie.getLastMovie.callCount).to.equal(1);
  })

  it('should return the time TimeStamp of the last record', function() {
    movie_helper.getLastRecord()
    .then(function(date) {
      expect(date).to.eql(new Date("2017-03-23T01:39:45Z"));

    });
  })
})

// Test Fetch functions

// describe('#getLatLng', function() {
//
//   it('should call the fetch method', function() {
//     const address = '32 north street';
//     sinon.stub(movie_helper, 'fetch').returns(Promise.resolve({}))
//     movie_helper.getLatLng(address);
//
//     expect(movie_helper.fetch.callCount).to.equal(1);
//   })
// })
