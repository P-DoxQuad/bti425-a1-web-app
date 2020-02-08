import React from 'react';
//import BodyContent from './components/BodyContent.js';
import NavBar from './components/header/NavBar.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from "./components/pages/Home.js";
import VehicleList from "./components/pages/VehicleList.js";
import About from "./components/pages/About.js";


function App() {
  return (
    <div>
      
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/vehicle-list" component={VehicleList} />
          <Route exact path="/about" component={About} />
        </Switch>
      </Router>
      
    </div>
    
  )

}

export default App;
