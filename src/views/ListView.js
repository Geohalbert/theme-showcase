import React from "react";
import { Link } from "react-router-dom";
import QuakeService from "../services/QuakeService";

class ListView extends React.Component {
  constructor() {
    super();
    this.state = {
      quakes: []
    };

    this.quakeService = new QuakeService();
  }

  componenDidMount() {
    this.quakeService.getQuakeList.then(response => {
      console.log("response: ", response);
      this.setState({ quakes: response.features });
    });
  }

  renderQuakes = () => {
    return this.state.quakes.map((quake, key) => {
      return (
        <li key={key}>
          <Link to={`/quake/${quake.id}`}>Quake {quake.id}</Link>
        </li>
      );
    });
  };

  render() {
    return (
      <div>
        <ul>{this.renderQuakes()}</ul>
      </div>
    );
  }
}

export default ListView;
