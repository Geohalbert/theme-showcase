import React from "react";
import QuakeService from "../services/QuakeService";

class QuakeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quake: {}
    };

    this.quakeService = new QuakeService();
  }

  componentDidMount() {
    const quakeId = this.props.match.params.id;
    this.quakeService.getQuake(quakeId).then(response => {
      this.setState({ quake: response });
    });
  }

  render() {
    const quake = this.state.quake;
    return <div>Quake {quake.id}</div>;
  }
}

export default QuakeView;
