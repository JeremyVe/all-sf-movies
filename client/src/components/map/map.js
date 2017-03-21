import React from 'react';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.markers = [];
    this.map;
  }

  componentDidMount() {
    var sf = {lat: 37.7749, lng: -122.4194};
    this.map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: sf
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.locations !== nextProps.locations) {
      console.log('cleaning old markers')
      this.markers.forEach(marker => {
        marker.setMap(null);
      })
      this.markers = [];
      console.log('adding new markers')
      nextProps.locations.forEach(location => {
        let latLng = new window.google.maps.LatLng(location.lat, location.lng);
        let marker = new window.google.maps.Marker({
          position: latLng,
          title: location.address
        })
        marker.setMap(this.map);
        this.markers.push(marker);
      })
    }
  }

  render() {

    return (
      <div id='map'>Map !</div>
    )
  }
}

export default Map;
