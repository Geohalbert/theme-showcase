import React from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class QueryForm extends React.Component {
  state = {
    startDate: new Date(),
    endDate: new Date(),
    count: 10
  };

  handleStart = date => {
    console.log("handleStart");
    this.setState({
      startDate: date
    });
  };
  handleEnd = date => {
    console.log("handleEnd");
    this.setState({
      endDate: date
    });
  };

  render() {
    return (
      <form>
        <a>Start Date:</a>
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleStart}
        />
        <a>End Date:</a>
        <DatePicker selected={this.state.endDate} onChange={this.handleEnd} />
      </form>
    );
  }
}
export default QueryForm;
