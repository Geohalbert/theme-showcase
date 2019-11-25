import React from "react";
import { Link } from "react-router-dom";

function HomeView() {
  return (
    <div className="Home">
      <div>
        <h3>
          Growing up, I've always been fascinated by the behavior of
          earthquakes. Utilizing an API provided by the USGS to gather
          earthquake data from around the world, this app will feature various
          visualizations of this data.
        </h3>
        <br />
        <br />
        <h3>
          To get started without creating a user profile, click
          <Link to={`/query`}>Here</Link>{" "}
        </h3>
      </div>
    </div>
  );
}

export default HomeView;
