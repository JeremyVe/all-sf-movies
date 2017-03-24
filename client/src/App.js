import React, { Component } from 'react';
import movie_helper from './helpers/movie';
import './App.css';

import Nav from './components/nav/nav';
import Map from './components/map/map';
import SearchComponent from './components/search_component/search_component';
import PanelInfo from './components/panel_info/panel_info';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { movie: {}, movies: [], locations: [], selectedLocationId: '' }
  }

  getMovies() {
    movie_helper.getMovies()
    .then(movies => {
      this.setState({
        movies: movies
      })
    })
  }

  getMovie = id => {
    movie_helper.getMovie(id)
    .then(data => {
      this.setState({
        movie: data.movie,
        locations: data.locations
      })
    })
  }

  resetMovie = () => {
    this.setState({
      movie: {}
    })
  }

  selectLocation = id => {
    this.setState({
      selectedLocationId: id
    })
  }

  componentDidMount() {
    this.getMovies();
  }

  render() {
    return (
      <div>
          <Nav />
          <div className='App'>
            <Map locations={this.state.locations} selectedLocationId={this.state.selectedLocationId} />
            <div className='search-panel'>
              <SearchComponent movies={this.state.movies} getMovie={this.getMovie} resetMovie={this.resetMovie} />
              <PanelInfo movie={this.state.movie} locations={this.state.locations} selectLocation={this.selectLocation} />
            </div>
          </div>
      </div>
    );
  }
}

export default App;
