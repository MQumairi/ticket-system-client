import React, { useEffect, useContext } from "react";
import Navbar from "../Navbar/Navbar";
import "./App.css";
import Tickets from "../Tickets/Tickets";
import TicketsNew from "../TicketsNew/TicketsNew";
import TicketDetails from "../TicketDetails/TicketDetails";
import Footer from "../Footer/Footer";
import { Route, Switch } from "react-router-dom";
import Store from "./Store/rootStore";
import LoginPage from "../Login/LoginPage";
import { observer } from "mobx-react-lite";

function App() {
  const store = useContext(Store);
  const { token, appLoaded, setAppLoaded } = store.commonStore;
  const { getCurrentUser, isLogged } = store.userStore;

  useEffect(() => {
    if (token) {
      getCurrentUser().finally(() => setAppLoaded());
    } else {
      setAppLoaded();
    }
  }, [getCurrentUser, setAppLoaded, token]);

  if (appLoaded && !isLogged) {
    return (
      <div id="App">
        <Navbar />
        <div id="mainContentBody">
          <LoginPage />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div id="App">
      <Navbar />
      <div id="mainContentBody">
        <Switch>
          <Route exact path={["/", "/tickets"]} component={Tickets} />
          <Route path="/tickets/new" component={TicketsNew} />
          <Route exact path="/tickets/:id" component={TicketDetails} />
          <Route exact path="/login" component={LoginPage} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default observer(App);
