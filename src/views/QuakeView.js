import React from "react";

class QuakeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quake: {}
    };
  }

  componentDidMount() {
    console.log(this.props.match.params.numer);
  }

  render() {
    return (
      <div>
        <h3>Quake:</h3>
      </div>
    );
  }
}

export default QuakeView;
