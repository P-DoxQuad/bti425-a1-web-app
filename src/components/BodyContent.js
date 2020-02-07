import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import Home from "./pages/Home.js";

class BodyContent extends Component {
    render() {
        return (
            <Router>
                <Route exact path="/" render={() => (<Home />)} />



            </Router>

        )
    }
}

export default BodyContent;
