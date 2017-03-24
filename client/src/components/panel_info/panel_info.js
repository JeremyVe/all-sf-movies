import React from 'react';
import AddressList from './address_list/address_list';
import MovieInfo from './movie_info/movie_info';
import NoMovieSelected from './no_movie_selected/no_movie_selected';
import './panel_info.css';

class PanelInfo extends React.Component {
  render() {
    let panel = Object.keys(this.props.movie).length > 0 ?
      (
        <div>
          <MovieInfo movie={this.props.movie} />
          <AddressList locations={this.props.locations} selectLocation={this.props.selectLocation} />
        </div>
      ) :
      (
        <div>
          <NoMovieSelected />
        </div>
      )
    return (
      <div className='panel'>
        {panel}
      </div>
    )
  }
}

PanelInfo.propTypes = {
  movie: React.PropTypes.object.isRequired,
  locations: React.PropTypes.array.isRequired,
  selectLocation: React.PropTypes.func.isRequired,
}

export default PanelInfo;
