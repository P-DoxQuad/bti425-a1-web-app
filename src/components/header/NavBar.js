import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavButton from '../NavButton'

class NavBar extends Component {
    render() {
        return (
            <nav class="navbar navbar-inverse">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                            <span class="sr-only">Toggle Navigation</span>->
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <a href="index.html" class="navbar-brand">Assignment 1</a>
                    </div>
                    <Router>
                    <div class="collapse navbar-collapse" id="myNavbar">
                        <ul class="nav navbar-nav">
                            <NavButton name="Home" page="/" />
                            <NavButton name="Vehicle List" page="/vehicles" />
                            <NavButton name="About" page="/about" />
                        </ul>
                    </div>
                    </Router>
                </div>
            </nav>
        )
    }
}

export default NavBar
