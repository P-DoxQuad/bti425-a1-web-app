import React, { Component } from 'react';
import NavButton from '../NavButton';

class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                            <span className="sr-only">Toggle Navigation</span>->
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a href="index.html" className="navbar-brand">Michael Dzura</a>
                    </div>
                    <div className="collapse navbar-collapse" id="myNavbar">
                        <ul className="nav navbar-nav">
                            <NavButton name="Home" page="/" />
                            <NavButton name="Vehicle List" page="/vehicles" />
                            <NavButton name="Add A Vehicle" page="/vehicle/add/" />
                            <NavButton name="Other" page="/about" />
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default NavBar
