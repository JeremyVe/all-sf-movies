import React from 'react';
import './search_bar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searchText: ''};
  }

  updateAutoComplete = evt => {
    let searchText = evt.target.value;
    this.setState({
      searchText: searchText
    })

    this.props.updateAutoComplete(searchText);
  }

  inhideAutoComplete = () => {
    setTimeout(() => {
      this.props.hideAutoComplete();
    }, 100)
  }

  searchMovie = () => {
    this.props.searchMovie(this.state.searchText);
  }

  render() {
    return (
      <div className='searchbar'>
        <input type='text' placeholder='Enter a movie name...'
                           onChange={this.updateAutoComplete}
                           onBlur={this.inhideAutoComplete} />
        <button onClick={this.searchMovie}>Search</button>
      </div>
    )
  }
}

SearchBar.propTypes = {
  updateAutoComplete: React.PropTypes.func.isRequired,
  hideAutoComplete: React.PropTypes.func.isRequired,
  searchMovie: React.PropTypes.func.isRequired,
}

export default SearchBar;
