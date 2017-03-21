import React from 'react';
import './movie-info.css';

class MovieInfo extends React.Component {
  render() {
    const movie = this.props.movie
    return (
      <div className='movie-info'>
        <h3>{movie.title}</h3>
        <p>Release Year : {movie.release_year}</p>
        <p>Production Company : {movie.production_company}</p>
      </div>
    )
  }
}

export default MovieInfo;
