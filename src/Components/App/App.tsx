import React, { useEffect, useContext } from "react";
import Navbar from "../Navbar/Navbar";
import "./App.css";
import Tickets from "../Tickets/Tickets";
import TicketsNew from "../TicketsNew/TicketsNew";
import TicketsEdit from "../TicketsEdit/TicketsEdit";
import TicketDetails from "../TicketDetails/TicketDetails";
import Footer from "../Footer/Footer";
import { Route, Switch } from "react-router-dom";
import Store from "./Store/rootStore";
import LoginPage from "../Login/LoginPage";
import LandingPage from "../Landing Page/LandingPage";
import RegisterPage from "../Register/RegisterPage";
import DeleteConfirmation from "../DeleteConfirmation/DeleteConfirm";
import { observer } from "mobx-react-lite";
import Profile from "../Profile/Profile";

function App() {
  const store = useContext(Store);
  const { token, appLoaded, setAppLoaded } = store.commonStore;
  const { getCurrentUser, isLogged } = store.userStore;
  const {loadProducts} = store.productStore;
  const {loadStatuses} = store.statusStore;

  useEffect(() => {
    if (token) {
      getCurrentUser().finally(() => setAppLoaded());
      loadProducts();
      loadStatuses();
    } else {
      setAppLoaded();
    }
  }, [getCurrentUser, setAppLoaded, token, loadProducts, loadStatuses]);

  if (appLoaded && !isLogged) {
    return (
      <div id="App">
        <Navbar />
        <div id="mainContentBody">
          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route path="/" component={LandingPage} />
          </Switch>
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
          <Route exact path="/tickets/new" component={TicketsNew} />
          <Route exact path="/tickets/:id" component={TicketDetails} />
          <Route exact path="/tickets/:id/delete" component={DeleteConfirmation} />
          <Route exact path="/tickets/:id/edit" component={TicketsEdit} />
          <Route exact path="/profile"  component={Profile} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default observer(App);
