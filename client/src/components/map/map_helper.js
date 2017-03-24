let markers;
let map;

const deleteOldMarker = markers => {
  markers.forEach(marker => {
    marker.setMap(null);
  })
  markers = [];
}

module.exports.set = (mmarkers, mmap) => {
  markers = markers;
  map = mmap;
}

module.exports.setMarkers = (locations) => {
  deleteOldMarker(markers);

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
}

module.exports.setInfoWindow = (id) => {
  let marker = markers.find(marker => marker.id === id);
  this.infowindow.setContent(marker.title);
  this.infowindow.open(map, marker);
}
