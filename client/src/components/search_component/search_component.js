import React from 'react';
import SearchBar from './search_bar/search_bar';
import AutoComplete from './auto_complete/auto_complete';
import './search_component.css';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {autoCompleteList: [],
                  hideAutoComplete: true,
                  selectedMovie: {},
                  searchText: ''}
  }


  updateAutoComplete = searchText => {
    const autoCompleteList = this.props.movies.filter(movie => movie.title.toLowerCase().includes(searchText));
    this.setState({
      hideAutoComplete: false,
      autoCompleteList: autoCompleteList
    })
  }

  searchMovie = searchText => {
    console.log('hello kimmm')
    const movieResult = this.props.movies.find(movie => movie.title.toLowerCase().includes(searchText));
    if (!!movieResult) {
      this.setState({
        movieTitle: movieResult.title,
        hideAutoComplete: true
      })
      return this.props.getMovie(movieResult._id);
    }
    return this.props.resetMovie();
  }

  hideAutoComplete = () => {
    this.setState({
      hideAutoComplete: true
    })
  }


  render() {
    return (
      <div className='search'>
        <SearchBar updateAutoComplete={this.updateAutoComplete}
                   hideAutoComplete={this.hideAutoComplete}
                   searchMovie={this.searchMovie} />
        <AutoComplete movies={this.state.autoCompleteList}
                      hideList={this.state.hideAutoComplete}
                      searchMovie={this.searchMovie} />
      </div>
    )
  }
}

Search.propTypes = {
  movies: React.PropTypes.array.isRequired,
  getMovie: React.PropTypes.func.isRequired,
  resetMovie: React.PropTypes.func.isRequired,
}

export default Search;
