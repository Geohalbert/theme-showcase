import axios from "axios";
const API_URL =
  "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson";

class QuakeService {
  async getQuakeList(queryString) {
    const url = `${API_URL}${queryString}`;
    return axios.get(url).then(response => response.data.features);
  }

  async getQuake(id) {
    const url = `${API_URL}&eventid=${id}`;
    return axios.get(url).then(response => response.data);
  }
}

export default QuakeService;
