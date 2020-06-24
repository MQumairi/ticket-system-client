import React from 'react';
import Navbar from '../Navbar/Navbar'
import "./App.css";
import Tickets from '../Tickets/Tickets'

function App() {
  return (
    <div className="App">
      <Navbar/>
      <div id="mainContentBody">
      <Tickets/>
      </div>
    </div>
  );
}

export default App;