import React from 'react';
import './map.css';


// Helpers

const deleteOldMarker = markers => {
  markers.forEach(marker => {
    marker.setMap(null);
  })
  markers = [];
}

const setMarkers = (map, locations) => {
  let markers = [];

  locations.forEach(location => {
    let latLng = new window.google.maps.LatLng(location.lat, location.lng);
    let marker = new window.google.maps.Marker({
      position: latLng,
      title: location.address,
      id: location._id
    })
    marker.setMap(map);
    markers.push(marker);
  })
  return markers
}

const findMarker = (markers, id) => {
  return markers.find(marker => marker.id === id);
}

const setInfoWindow = (map, infowindow, marker) => {
  infowindow.setContent(marker.title);
  infowindow.open(map, marker);
}



class Map extends React.Component {
  constructor(props) {
    super(props);
    this.markers = [];
  }

  componentDidMount() {
    var sf = {lat: 37.7749, lng: -122.4194};
    this.map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: sf
    })
    this.infowindow = new window.google.maps.InfoWindow({});
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.locations !== nextProps.locations) {
      deleteOldMarker(this.markers);
      this.markers = setMarkers(this.map, nextProps.locations);
    }

    if (this.props.selectedLocationId !== nextProps.selectedLocationId) {
      let marker = findMarker(this.markers, nextProps.selectedLocationId);
      setInfoWindow(this.map, this.infowindow, marker);
    }
  }



  render() {
    return (
      <div id='map'>Map !</div>
    )
  }
}


Map.propTypes = {
  locations: React.PropTypes.array.isRequired,
  selectedLocationId: React.PropTypes.string.isRequired
}

export default Map;
