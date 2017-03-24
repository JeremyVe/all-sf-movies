import React from 'react';
import './no_movie_selected.css';

class NoMovieSelected extends React.Component {
  render() {
    return (
      <div className='empty-selection'>
        You can select a Movie with The Search Box
      </div>
    )
  }
}

export default NoMovieSelected;
