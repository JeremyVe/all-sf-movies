import React, { Component } from 'react';
import './App.css';

import Map from './components/map/map';
import SearchComponent from './components/search-component/search-component';
import MovieInfo from './components/movie-info/movie-info';
import List from './components/list/list';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { movie: {}, movies: [], locations: [] }
  }

  getMovies() {
    fetch('/movies')
    .then(data => data.json())
    .then(movies => {
      this.setState({
        movies: movies
      })
    })
    .catch(err => {
      console.log('error fetching movie list :', err)
    })
  }

  getMovie = (id) => {
    fetch('/movie/' + id)
    .then(data => data.json())
    .then(data => {
      // Todos : get movie + locations
      this.setState({
        movie: data.movie,
        locations: data.locations
      })
    })
    .catch(err => {
      console.log('error fetching movie info :', err)
    })
  }

  componentDidMount() {
    this.getMovies();
  }

  render() {
    const movieInfoNode = this.state.movie.title ? <MovieInfo movie={this.state.movie} /> : null;
    return (
      <div>
          <div className='nav'>
            <h2>SF Movies</h2>
          </div>
          <div className='App'>
            <Map locations={this.state.locations} />
            <div className='search-panel'>
              <SearchComponent movies={this.state.movies} getMovie={this.getMovie} />
              {movieInfoNode}
              <List movie={this.state.movie} locations={this.state.locations} />
            </div>
          </div>
      </div>
    );
  }
}

export default App;
