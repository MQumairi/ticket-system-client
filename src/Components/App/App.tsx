import React from "react";
import Navbar from "../Navbar/Navbar";
import "./App.css";
import Tickets from "../Tickets/Tickets";
import TicketsNew from "../TicketsNew/TicketsNew";
import Footer from "../Footer/Footer";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div id="App">
      <Navbar />
      <div id="mainContentBody">
        <Switch>
          <Route exact path={["/", "/tickets"]} component={Tickets} />
          <Route
            path={["/postNewTicket", "/tickets/new"]}
            component={TicketsNew}
          />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
