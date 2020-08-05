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
  // const { loadTickets } = store.ticketStore;
  // const { loadStatuses } = store.statusStore;
  // const { loadProducts } = store.productStore;
  const { token, appLoaded, setAppLoaded } = store.commonStore;
  const { getCurrentUser, isLogged } = store.userStore;

  useEffect(() => {
    if (token) {
      console.log("App if true");
      getCurrentUser().finally(() => setAppLoaded());
      // loadTickets();
      // loadStatuses();
      // loadProducts();
    } else {
      console.log("App if false");
      console.log(token);
      setAppLoaded();
    }
  }, [
    // loadTickets,
    // loadStatuses,
    // loadProducts,
    getCurrentUser,
    setAppLoaded,
    token,
  ]);

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
