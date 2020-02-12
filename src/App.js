/*********************************************************************************
 * BTI425 – Assignment 1 
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy. 
 * No part of this assignment has been copied manually or electronically from any other source 
 * (including 3rd-party web sites) or distributed to other students. 
 * 
 * Name: Michael Dzura Student ID: 033566100 Date: 02/11/2020
 * 
 * Online (Heroku) URL: https://bti425-a1-web-app.herokuapp.com
 * ********************************************************************************/

/***********************************************************************
 * Import packages and other components - Each page rendered is stored *
 * in a separate JS file.                                              *
 ***********************************************************************/
import React from 'react';
import NavBar from './components/header/NavBar.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from "./components/pages/Home.js";
import VehicleList from "./components/pages/VehicleList.js";
import VehicleDetail from "./components/pages/VehicleDetail.js";
import AddVehicle from "./components/pages/AddVehicle.js";
import DelVehicle from "./components/pages/DelVehicle.js";
import EditVehicle from "./components/pages/EditVehicle.js";
import About from "./components/pages/About.js";

/***********************************************************************
 * Main App Function. This function defines the structure of the site. *
 * It contains Components that are referenced by Tags that render the  *
 * page.                                                               * 
 ***********************************************************************/
function App() {
  return (
    <div>
      <Router>
         <NavBar />                           {/* The Top Navigation Bar */}
        <Switch>                              {/* Start Breakout for different Routes */}

{/******************** Routes are paths to render other pages. ********************************************************************************************/}
          <Route exact path="/" render={() => (<Home />)} />                                                            {/* Goto Home Page */}
          <Route exact path="/vehicles" render={() => (<VehicleList />)} />                                             {/* Goto Vehicle List Page */}
          <Route exact path="/vehicles/:id" render={(props) => (<VehicleList id={props.match.params.id}/>)} />          {/* Goto Vehicle By ID Page */}
          <Route exact path="/vehicle/detail/:id" render={(props) => (<VehicleDetail id={props.match.params.id}/>)} />  {/* Goto Vehicle Detail Page */}
          <Route exact path="/vehicle/add/" render={() => (<AddVehicle />)} />                                          {/* Goto Add Vehicle Page */}
          <Route exact path="/vehicle/delete/:id" render={(props) => (<DelVehicle id={props.match.params.id}/>)} />     {/* Goto Delete Vehicle Page */}
          <Route exact path="/vehicle/edit/:id" render={(props) => (<EditVehicle id={props.match.params.id}/>)} />      {/* Goto Edit Vehicle Page */}
          <Route exact path="/about" render={() => (<About />)} />                                                      {/* Goto About Page */}
{/*********************************************************************************************************************************************************/}
        </Switch>
      </Router>
    </div>
  )
}
export default App;
/***********************************************************************/
