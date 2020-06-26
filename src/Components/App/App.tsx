import React from 'react';
import Navbar from '../Navbar/Navbar'
import "./App.css";
import Tickets from '../Tickets/Tickets'
import Footer from '../Footer/Footer'

function App() {

  return (
    <div id="App">
      <Navbar/>
      <div id="mainContentBody">
      <Tickets/>
      </div>
      <Footer/>
    </div>
  );
}

export default App;