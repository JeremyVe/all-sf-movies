import React from 'react';
import SearchBar from './search-bar/search-bar';
import AutoComplete from './auto-complete/auto-complete';
import './search-component.css';

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
    const movieResult = this.props.movies.find(movie => movie.title.toLowerCase().includes(searchText));
    if (!!movieResult) {
      this.setState({
        movieTitle: movieResult.title,
        hideAutoComplete: true
      })
      this.props.getMovie(movieResult._id);
    }
  }

  hideAutoComplete = () => {
    this.setState({
      hideAutoComplete: true
    })
  }


  render() {
    return (
      <div className='search'>
        <SearchBar movieTitle={this.state.movieTitle}
                   updateAutoComplete={this.updateAutoComplete}
                   hideAutoComplete={this.hideAutoComplete}
                   searchMovie={this.searchMovie} />
        <AutoComplete movies={this.state.autoCompleteList}
                      hideList={this.state.hideAutoComplete}
                      searchMovie={this.searchMovie} />
      </div>
    )
  }
}

export default Search;
