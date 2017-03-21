import React from 'react';
import './auto-complete.css';

class AutoComplete extends React.Component {

  selectMovie = (evt) => {
    const title = evt.target.innerHTML.toLowerCase();
    this.props.searchMovie(title);
  }

  render() {
    const movieNodes = this.props.movies.map(movie => {
      return <li key={movie._id} data-id={movie._id}>{movie.title}</li>
    })
    return (
      <div className={this.props.hideList ? 'hide' : ''}>
        <ul className='autocomplete-list' onClick={this.selectMovie}>
          {movieNodes}
        </ul>
      </div>
    )
  }
}

export default AutoComplete;
