import React from 'react';
import './search-bar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searchText: ''};
  }

  // componentWillReceiveProps(nextProps) {
  //   if (this.state.searchText !== nextProps.movieTitle) {
  //     console.log('run')
  //     this.textInput.value = nextProps.movieTitle;
  //   }
  // }

  updateAutoComplete = evt => {
    let searchText = evt.target.value;
    this.setState({
      searchText: searchText
    })

    this.props.updateAutoComplete(searchText);
  }

  hideAutoComplete = () => {
    setTimeout(() => {
      this.props.hideAutoComplete();
    }, 30)
  }

  searchMovie = () => {
    this.props.searchMovie(this.state.searchText);
  }

  render() {
    return (
      <div className='searchbar'>
        <input type='text' placeholder='Enter a movie name...'
                           ref={input => this.textInput = input}
                           onChange={this.updateAutoComplete}
                           onBlur={this.hideAutoComplete} />
        <button onClick={this.searchMovie}>Search</button>
      </div>
    )
  }
}

export default SearchBar;
