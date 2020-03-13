import React from "react";
import { Switch, Route } from "react-router-dom";
import Index from "./Index";
import Login from "./Login";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={props => <Index {...props} />} />
        <Route path="/login" render={props => <Login {...props} />} />
      </Switch>
    </div>
  );
}

export default App;
