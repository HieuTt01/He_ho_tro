import logo from "./logo.svg";
import "./App.css";
import { Button } from "antd";
import "antd/dist/antd.css";
import LoginForm from "./components/signPage/LoginForm";
import RegisterForm from "./components/signPage/RegisterForm";
import SignPage from "./components/signPage/SignPage";
import { Fragment, useEffect, useState } from "react";
import Home from "./components/homePage/Home";
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from "react-router-dom";
import firebase from './firebase';

export default function App() {
  return (
    <div>
      App
    </div>
  );
}