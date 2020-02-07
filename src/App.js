import React from 'react';
import BodyContent from './components/BodyContent.js';
import NavBar from './components/header/NavBar.js';
import { Route } from 'react-router-dom';


function App() {
  return (
    <div>
      <NavBar />
      <BodyContent />
    </div>
    
  )

}

export default App;
