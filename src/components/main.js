import React from "react";
import { Switch, Route } from "react-router-dom";
import ListView from "../views/ListView.js";
import QuakeView from "../views/QuakeView.js";
import QueryForm from "../views/QueryForm.js";

function Main() {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={QueryForm} />
        <Route exact path="/quakes" component={ListView} />
        <Route path="/quakes/quake:id" component={QuakeView} />
      </Switch>
    </main>
  );
}

export default Main;
