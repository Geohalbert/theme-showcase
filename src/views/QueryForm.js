import React from "react";
import DatePicker from "react-datepicker";
import ListView from "./ListView";
import QuakeService from "../services/QuakeService";
import "react-datepicker/dist/react-datepicker.css";

class QueryForm extends React.Component {
  constructor() {
    super();
    this.state = {
      starttime: new Date().setDate(new Date().getDate() - 1),
      endtime: new Date(),
      minmagnitude: null,
      maxmagnitude: null,
      orderby: "time",
      limit: 10,
      quakes: []
    };

    this.quakeService = new QuakeService();
    this.handleLimit = this.handleLimit.bind(this);
  }

  handleStart = date => {
    this.setState({
      starttime: date
    });
  };
  handleEnd = date => {
    this.setState({
      endtime: date
    });
  };
  handleLimit(e) {
    this.setState({
      limit: e.currentTarget.value
    });
  }

  convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  queryString = () => {
    let state = this.state;
    let convertStart = this.convert(this.state.starttime);
    let convertEnd = this.convert(this.state.endtime);
    let start = `&starttime=${convertStart}`;
    let end = `&endtime=${convertEnd}`;
    let params = [start, end];
    Object.keys(state).forEach((key, index) => {
      if (
        state[key] != null &&
        key !== "starttime" &&
        key !== "endtime" &&
        key !== "quakes"
      ) {
        params.push(`&${key}=${state[key]}`);
      }
    });
    let queryUrl = params.join("");
    return queryUrl;
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
            selected={this.state.starttime}
            onChange={this.handleStart}
          />
          <label>End Date:</label>
          <DatePicker selected={this.state.endtime} onChange={this.handleEnd} />
          <label>Limit:</label>
          <input
            type="number"
            max={100}
            onChange={this.handleLimit}
            value={this.state.limit}
          />
        </form>
        {this.state.quakes.length > 0 && (
          <ListView quakes={this.state.quakes} />
        )}
        <button onClick={this.submitQuery}>Submit Query</button>
        {/* <button onClick={this.stringCheck}>String Check </button> */}
      </div>
    );
  }
}
export default QueryForm;
