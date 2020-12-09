import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./App.css";
import "antd/dist/antd.css";
// import App from "./App";
import { Fragment, useEffect, useState } from "react";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from "react-router-dom";
import LoginForm from "./components/signPage/LoginForm";
import RegisterForm from "./components/signPage/RegisterForm";
import SignPage from "./components/signPage/SignPage";
import Home from "./components/homePage/Home";
import firebase from './firebase';


function Root(props) {
    const [user, setUser] = useState({});
    useEffect(() => {
        firebase.auth().onAuthStateChanged(userlogin => {
            if (userlogin) {
                setUser(userlogin);
                props.history.push('/')
                // console.log(user)
            }
            else {
                props.history.push('/login');
            }
        })
    }, []);

    return (
        <Switch>
            <Route exact path="/">
                <Home user={user} clearUser={()=> setUser(null)}/>
            </Route>
            <Route
                path="/login"
                render={(props) => {
                    return <LoginForm {...props} />;
                }}
            ></Route>
            <Route
                path="/register"
                render={(props) => {
                    return <RegisterForm {...props} />;
                }}
            ></Route>
        </Switch>
    );
}


export default Root;

const RootWithAuth = withRouter(Root);


ReactDOM.render(
    <Router>
        <RootWithAuth />
    </Router>,
    document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
