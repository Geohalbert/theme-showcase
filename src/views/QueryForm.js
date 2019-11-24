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
      minlatitude: null,
      maxlatitude: null,
      minlongitude: null,
      maxlongitude: null,
      maxdepth: null,
      mindepth: null,
      orderby: "time",
      limit: 10,
      quakes: []
    };

    this.quakeService = new QuakeService();
    this.handleChange = this.handleChange.bind(this);
    this.baseState = this.state;
  }

  // TO DO:
  // Figure out why number inputs wont clear with null
  // add classNames/id's for divs

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

  resetParams = () => {
    this.setState(this.baseState);
  };

  queryString = () => {
    let state = this.state;
    this.setState({ loading: true });
    let start = `&starttime=${this.convert(state.starttime)}`;
    let end = `&endtime=${this.convert(state.endtime)}`;
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
        this.setState({ quakes: [], loading: false });
        alert("No results match your criteria");
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
          <label>Limit (100 max):</label>
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
            value={this.state.minmagnitude}
            onChange={this.handleChange}
          />
          <label>Maximum Magnitude:</label>
          <input
            type="number"
            min={0}
            max={10}
            name="maxmagnitude"
            value={this.state.maxmagnitude}
            onChange={this.handleChange}
          />
          <label>Min Latitude:</label>
          <input
            type="number"
            min={-90}
            max={90}
            name="minlatitude"
            value={this.state.minlatitude}
            onChange={this.handleChange}
          />
          <label>Max Latitude:</label>
          <input
            type="number"
            min={-90}
            max={90}
            name="maxlatitude"
            value={this.state.maxlatitude}
            onChange={this.handleChange}
          />
          <label>Min Longitude:</label>
          <input
            type="number"
            min={-360}
            max={360}
            name="minlongitude"
            value={this.state.minlongitude}
            onChange={this.handleChange}
          />
          <label>Max Longitude:</label>
          <input
            type="number"
            min={-360}
            max={360}
            name="maxlongitude"
            value={this.state.maxlongitude}
            onChange={this.handleChange}
          />
          <label>
            Sort by:
            <select
              value={this.state.orderby}
              name="orderby"
              onChange={this.handleChange}
            >
              <option value="time">Time - descending</option>
              <option value="time-asc">Time - ascending</option>
              <option value="magnitude">Magnitude - descending</option>
              <option value="magnitude-asc">Mangitude - ascending</option>
            </select>
          </label>
        </form>
        {this.state.loading && <div>GATHERING DATA</div>}
        {this.state.quakes.length > 0 && (
          <ListView quakes={this.state.quakes} />
        )}
        <button onClick={this.submitQuery} id="submitButton">
          Submit Query
        </button>
        <button onClick={this.resetParams} id="resetParams">
          Reset Params
        </button>
        {/* <button onClick={this.stringCheck}>String Check </button> */}
      </div>
    );
  }
}
export default QueryForm;
