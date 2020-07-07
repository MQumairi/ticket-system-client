import React from "react";
import Navbar from "../Navbar/Navbar";
import "./App.css";
import Tickets from "../Tickets/Tickets";
import TicketsNew from "../TicketsNew/TicketsNew";
import TicketDetails from "../TicketDetails/TicketDetails";
import Footer from "../Footer/Footer";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div id="App">
      <Navbar />
      <div id="mainContentBody">
        <Switch>
          <Route
            exact
            path={["/", "/tickets"]}
            component={Tickets}
            key={Date.now()}
          />
          <Route path="/tickets/new" component={TicketsNew} />
          <Route exact path="/tickets/:id" component={TicketDetails}/>
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
