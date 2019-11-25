import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <img
        src="https://earthquake.usgs.gov/theme/site/earthquake/banner.png"
        alt="eq"
        id="banner"
      />
      <Link to={`/query`}>Earthquake Query</Link>
      <Link to={`/`}>About</Link>
      <Link to={`/query`}>Login</Link>
    </header>
  );
}

export default Header;
