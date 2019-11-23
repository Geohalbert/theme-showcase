import React from "react";
import DatePicker from "react-datepicker";
import ListView from "./ListView";
import QuakeService from "../services/QuakeService";
import "react-datepicker/dist/react-datepicker.css";

class QueryForm extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      starttime: new Date().setDate(new Date().getDate() - 1),
      endtime: new Date(),
      minmagnitude: null,
      maxmagnitude: null,
      maxdepth: null,
      mindepth: null,
      orderby: "time",
      limit: 10,
      quakes: []
    };

    this.quakeService = new QuakeService();
    this.handleChange = this.handleChange.bind(this);
  }

  // TO DO:
  // drop down menu for orderby
  // min and max depth
  // reset query button

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
  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  queryString = () => {
    let state = this.state;
    this.setState({ loading: true });
    let convertStart = this.convert(this.state.starttime);
    let convertEnd = this.convert(this.state.endtime);
    let start = `&starttime=${convertStart}`;
    let end = `&endtime=${convertEnd}`;
    let params = [start, end];
    let ignore = ["starttime", "endtime", "quakes", "loading"];
    Object.keys(state).forEach((key, index) => {
      if (state[key] != null && !ignore.includes(key)) {
        params.push(`&${key}=${state[key]}`);
      }
    });
    return params.join("");
  };

  stringCheck = () => {
    let result = this.queryString();
    console.log("string check: ", result);
  };

  submitQuery = () => {
    let queryParams = this.queryString();
    this.quakeService.getQuakeList(queryParams).then(response => {
      if (response.length > 0) {
        this.setState({ quakes: response, loading: false });
      } else {
        this.setState({ loading: false });
        alert("No results that match your criteria");
      }
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
            min={1}
            max={100}
            name="limit"
            onChange={this.handleChange}
            value={this.state.limit}
            placeholder="maximum: 100"
          />
          <label>Minimum Magnitude:</label>
          <input
            type="number"
            min={0}
            max={10}
            name="minmagnitude"
            onChange={this.handleChange}
          />
          <label>Maximum Magnitude:</label>
          <input
            type="number"
            min={0}
            max={10}
            name="maxmagnitude"
            onChange={this.handleChange}
          />
        </form>
        {this.state.loading && <div>GATHERING DATA</div>}
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
