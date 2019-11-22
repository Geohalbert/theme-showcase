import React from "react";
import { Switch, Route } from "react-router-dom";
import QuakeView from "../views/QuakeView.js";
import QueryForm from "../views/QueryForm.js";

function Main() {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={QueryForm} />
        <Route path="/quake/:id" component={QuakeView} />
      </Switch>
    </main>
  );
}

export default Main;
