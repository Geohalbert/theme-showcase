import React from "react";
import { Link } from "react-router-dom";

class ListView extends React.Component {
  renderQuakes = () => {
    return this.props.quakes.map((quake, key) => {
      return (
        <div key={key} className="quakeLink">
          <Link to={`/quake/${quake.id}`}>Quake {quake.id}</Link>
        </div>
      );
    });
  };

  render() {
    return (
      <div>
        <div id="quakeList">{this.renderQuakes()}</div>
        <div id="quakeCount">Total earthquakes: {this.props.quakes.length}</div>
      </div>
    );
  }
}

export default ListView;
