import logo from "./logo.svg";
import "./App.css";
import { Button } from "antd";
import "antd/dist/antd.css";
import LoginForm from "./components/signPage/LoginForm";
import SignPage from "./components/signPage/SignPage";
import { Fragment, useState } from "react";
import Home from "./components/homePage/Home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <Fragment>
        <Switch>
          <Route exact path="/">
            <SignPage />
          </Route>
          <Route
            exact
            path="/login"
            render={(props) => {
              return <LoginForm {...props} />;
            }}
          ></Route>
          <Route
            path="/home"
            render={(props) => {
              return <Home {...props} />;
            }}
          ></Route>
        </Switch>
      </Fragment>
    </Router>
  );
}

export default App;
