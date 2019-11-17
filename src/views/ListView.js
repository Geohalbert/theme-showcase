import React from "react";

class ListView extends React.Component {
  constructor() {
    super();
    this.state = {
      quakes: []
    };
  }

  componenDidMount() {}

  render() {
    return (
      <div>
        <h3>Quake List:</h3>
      </div>
    );
  }
}

export default ListView;
