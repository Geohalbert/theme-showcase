import React from "react";
import DatePicker from "react-datepicker";
import ListView from "./ListView";
import QuakeService from "../services/QuakeService";
import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class QueryForm extends React.Component {
  constructor() {
    super();
    this.state = {
      startDate: new Date(),
      endDate: new Date(),
      count: 10,
      quakes: []
    };

    this.quakeService = new QuakeService();
  }

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

  queryString = () => {
    let queryUrl = "";
    let start = `&starttime=${this.state.startDate}`;
    let end = `&endtime=${this.state.endDate}`;
    let count = `&limit=${this.state.count}`;
    return queryUrl.concat(start, end, count);
  };

  submitQuery = () => {
    let queryParams = this.queryString();
    this.quakeService.getQuakeList(queryParams).then(response => {
      console.log("response from SubmitQuery: ", response);
      this.setState({ quakes: response.data });
    });
  };

  render() {
    return (
      <div>
        <form>
          <a>Start Date:</a>
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleStart}
          />
          <a>End Date:</a>
          <DatePicker selected={this.state.endDate} onChange={this.handleEnd} />
        </form>
        {this.state.quakes && <ListView props={this.state.quakes} />}
      </div>
    );
  }
}
export default QueryForm;
