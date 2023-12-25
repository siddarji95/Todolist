import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import history from "./history";
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Home from './components/Home';
import App from './components/App/App';
import ForgetPassword from './components/ForgetPassword';

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Route path="/" component={App} />
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/home" component={Home} />
                    <Route path="/forgetPassword" component={ForgetPassword} />
                </Switch>
            </Router>
        )
    }
}