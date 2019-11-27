import React from "react";
import GoogleMapReact from "google-map-react";

class SimpleMap extends React.Component {
  constructor(props) {
    super(props);
    // testing to see if it displays first by hardcoding state
    this.state = {
      lat: 37.774929,
      lng: -122.419416
    };
  }

  componentDidMount() {}
  render() {
    const zoom = 11;
    return (
      <div style={{ height: "50vh", width: "50%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.REACT_APP_GOOGLE_API_KEY.toString()
          }}
          defaultCenter={this.state}
          defaultZoom={zoom}
        >
          {/* <AnyReactComponent
            lat={37.774929}
            lng={-122.419416}
            text="My Marker"
          /> */}
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
