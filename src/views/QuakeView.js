import React from "react";
import QuakeService from "../services/QuakeService";

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
    return (
      <div>
        <div className="viewQuake">Quake {quakeId}</div>
        <div className="quake-details">
          <div className="quake-property">Place: {properties.place}</div>
          <div className="quake-property">Coordinates: {coordinates}</div>
          <div className="quake-property">Magnitude: {properties.mag}</div>
          <div className="quake-property">Time: {properties.time}</div>
        </div>
      </div>
    );
  }
}

export default QuakeView;
