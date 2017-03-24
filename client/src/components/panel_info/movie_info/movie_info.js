import React from 'react';
import './movie_info.css';

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

MovieInfo.propTypes = {
  movie: React.PropTypes.object.isRequired,
}

export default MovieInfo;
