import React from "react";
import QuakeService from "../services/QuakeService";
import "../themes/css/QueryForm.css";

class QuakeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quakeId: "",
      properties: {},
      coordinates: []
    };

    this.quakeService = new QuakeService();
  }

  componentDidMount() {
    const quakeId = this.props.match.params.id;
    this.quakeService.getQuake(quakeId).then(response => {
      this.setState({
        quakeId: response.id,
        properties: response.properties,
        coordinates: response.geometry.coordinates
      });
    });
  }

  render() {
    const { quakeId, properties, coordinates } = this.state;
    const convertTime = new Date(properties.time).toLocaleString();
    const coors = coordinates.join(", ");
    return (
      <div id="quake">
        <div className="quake-details">
          <div className="quake-property">Quake Id: {quakeId}</div>
          <div className="quake-property">Place: {properties.place}</div>
          <div className="quake-property">Coordinates: {coors}</div>
          <div className="quake-property">Magnitude: {properties.mag}</div>
          <div className="quake-property">Time: {convertTime}</div>
        </div>
        {/* {coordinates && <GoogleMap coordinates={coordinates} />} */}
      </div>
    );
  }
}

export default QuakeView;
