import React from "react";

class QuakeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quake: {}
    };
  }

  componentDidMount() {
    console.log(
      "QuakeView did mount, this.props.match.params.number",
      this.props.match.params.number
    );
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
