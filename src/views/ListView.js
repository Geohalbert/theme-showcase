import React from "react";
import { Link } from "react-router-dom";

class ListView extends React.Component {
  constructor(props) {
    super(props);
  }

  componenDidMount() {}

  renderQuakes = () => {
    return this.props.quakes.map((quake, key) => {
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
