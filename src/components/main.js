import React from "react";
import { Switch, Route } from "react-router-dom";
import ListView from "../views/ListView.js";
import QuakeView from "../views/QuakeView.js";

function Main() {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={ListView} />
        <Route path="/quake/quake:id" component={QuakeView} />
      </Switch>
    </main>
  );
}

export default Main;
