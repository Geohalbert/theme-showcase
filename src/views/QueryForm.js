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

  formatDate(date) {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
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
    return console.log(queryUrl.concat(start, end, count));
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
        {/* {this.state.quakes && <ListView props={this.state.quakes} />} */}
        <button onClick={this.queryString}>STRING CHECK</button>
      </div>
    );
  }
}
export default QueryForm;
