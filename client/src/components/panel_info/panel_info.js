import React from 'react';
import AddressList from './address_list/address_list';
import MovieInfo from './movie_info/movie_info';
import EmptySelection from './empty_selection/empty_selection';
import './panel_info.css';

class PanelInfo extends React.Component {
  render() {
    let panel = Object.keys(this.props.movie).length > 0 ?
      (
        <div>
          <MovieInfo movie={this.props.movie}/>
          <AddressList locations={this.props.locations}/>
        </div>
      ) :
      (
        <div>
          <EmptySelection />
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
}

export default PanelInfo;
