import React from "react";
import ReactDOM from "react-dom";

const mapStyles = {
  map: {
    width: "50%",
    height: "50%"
  }
};

export class QuakeLocation extends React.Component {
  constructor(props) {
    super(props);

    const { lat, lng } = this.props.initialCenter;
    this.state = {
      quakeLocation: {
        lat: lat,
        lng: lng
      }
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    if (prevState.quakeLocation !== this.state.quakeLocation) {
      this.recenterMap();
    }
  }

  recenterMap() {
    const map = this.map;
    const current = this.state.currentLocation;

    const google = this.props.google;
    const maps = google.maps;

    if (map) {
      let center = new maps.LatLng(current.lat, current.lng);
      map.panTo(center);
    }
  }
}
export default QuakeLocation;

QuakeLocation.defaultProps = {
  zoom: 11,
  initialCenter: {
    lat: 37.774929,
    lng: -122.419416
  },
  quakeLoaded: false,
  visible: true
};
