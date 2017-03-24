import React, { Component } from 'react';
import './App.css';

import Map from './components/map/map';
import SearchComponent from './components/search_component/search_component';
import PanelInfo from './components/panel_info/panel_info';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { movie: {}, movies: [], locations: [] }
  }

  getMovies() {
    fetch('/movies.json')
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

  getMovie = id => {
    fetch('/movie/' + id)
    .then(data => data.json())
    .then(data => {
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
    return (
      <div>
          <div className='nav'>
            <h2>SF Movies</h2>
          </div>
          <div className='App'>
            <Map locations={this.state.locations} />
            <div className='search-panel'>
              <SearchComponent movies={this.state.movies} getMovie={this.getMovie} />
              <PanelInfo movie={this.state.movie} locations={this.state.locations} />
            </div>
          </div>
      </div>
    );
  }
}

export default App;
