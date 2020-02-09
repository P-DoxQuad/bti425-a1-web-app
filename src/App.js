import React from 'react';
import NavBar from './components/header/NavBar.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from "./components/pages/Home.js";
import VehicleList from "./components/pages/VehicleList.js";
import VehicleDetail from "./components/pages/VehicleDetail.js";
import AddVehicle from "./components/pages/AddVehicle.js";
import DelVehicle from "./components/pages/DelVehicle.js";
import About from "./components/pages/About.js";

//import UserList from "./components/pages/FetchTest.js";



function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" render={() => (<Home />)} />
          <Route exact path="/vehicles" render={() => (<VehicleList />)} />
          <Route exact path="/vehicles/:id" render={(props) => (<VehicleList id={props.match.params.id}/>)} />
          <Route exact path="/vehicle/detail/:id" render={(props) => (<VehicleDetail id={props.match.params.id}/>)} />
          <Route exact path="/vehicle/add/" render={() => (<AddVehicle />)} />
          <Route exact path="/vehicle/delete/:id" render={(props) => (<DelVehicle id={props.match.params.id}/>)} />
          <Route exact path="/about" render={() => (<About />)} />
        </Switch>
      </Router>
    </div>
    
  )

}

export default App;
