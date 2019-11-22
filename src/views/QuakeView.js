import React from "react";
import QuakeService from "../services/QuakeService";

class QuakeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quakeId: "",
      properties: {}
    };

    this.quakeService = new QuakeService();
  }

  componentDidMount() {
    const quakeId = this.props.match.params.id;
    this.quakeService.getQuake(quakeId).then(response => {
      console.log("quake properties: ", response.properties);
      this.setState({ quakeId: response.id, properties: response.properties });
    });
  }

  render() {
    const { quakeId, properties } = this.state;
    return (
      <div>
        <div className="viewQuake">Quake {quakeId}</div>
        <div className="quake-properties">
          <div>Place: {properties.place}</div>
          <div>Magnitude: {properties.mag}</div>
          <div>Time: {properties.time}</div>
        </div>
      </div>
    );
  }
}

export default QuakeView;
