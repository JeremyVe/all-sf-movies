import React from 'react';
import './auto_complete.css';

class AutoComplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: props.movies,
      autoCompleteList: props.movies,
    }
  }

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

AutoComplete.propTypes = {

}

export default AutoComplete;
