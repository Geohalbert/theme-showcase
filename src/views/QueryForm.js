import React from "react";
import DatePicker from "react-datepicker";
import ListView from "./ListView";
import QuakeService from "../services/QuakeService";
import "react-datepicker/dist/react-datepicker.css";

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
    this.handleCount = this.handleCount.bind(this);
  }

  handleStart = date => {
    this.setState({
      startDate: date
    });
  };
  handleEnd = date => {
    this.setState({
      endDate: date
    });
  };
  handleCount(e) {
    this.setState({
      count: e.currentTarget.value
    });
  }

  convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  queryString = () => {
    let queryUrl = "";
    let convertStart = this.convert(this.state.startDate);
    let convertEnd = this.convert(this.state.endDate);
    let start = `&starttime=${convertStart}`;
    let end = `&endtime=${convertEnd}`;
    let count = `&limit=${this.state.count}`;
    return queryUrl.concat(start, end, count);
  };

  stringCheck = () => {
    let result = this.queryString();
    console.log("string check: ", result);
  };

  submitQuery = () => {
    let queryParams = this.queryString();
    this.quakeService.getQuakeList(queryParams).then(response => {
      this.setState({ quakes: response });
    });
  };

  render() {
    return (
      <div>
        <form>
          <label>Start Date:</label>
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleStart}
          />
          <label>End Date:</label>
          <DatePicker selected={this.state.endDate} onChange={this.handleEnd} />
          <label>Count:</label>
          <input
            type="number"
            max={100}
            onChange={this.handleCount}
            value={this.state.count}
          />
        </form>
        {this.state.quakes.length > 0 && (
          <ListView quakes={this.state.quakes} />
        )}
        <button onClick={this.stringCheck}>STRING CHECK</button>
        <button onClick={console.log("state check: ", this.state)}>
          STATE CHECK
        </button>
        <button onClick={this.submitQuery}>Submit Query</button>
      </div>
    );
  }
}
export default QueryForm;
