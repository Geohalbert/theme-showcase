import axios from "axios";
const API_URL =
  "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson";

function dates(date) {
  const d = new Date();
  let month = `${d.getMonth() + 1}`;
  let today = `${d.getDate()}`;
  let yesterday = `${d.getDate() - 1}`;
  let day;
  date === "yesterday" ? (day = yesterday) : (day = today);
  const year = d.getFullYear();

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;

  return [year, month, day].join("-");
}
class QuakeService {
  async getQuakeList() {
    const url = `${API_URL}&starttime=${dates("yesterday")}&endtime=${dates(
      "today"
    )}&limit=10`;
    return axios.get(url).then(response => response.data);
  }

  async getQuake(id) {
    const url = `${API_URL}&eventid=${id}`;
    return axios.get(url).then(response => response.data);
  }
}

export default QuakeService;
