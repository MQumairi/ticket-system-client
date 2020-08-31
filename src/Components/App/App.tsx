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
import DeleteConfirmation from "../DeleteConfirmation/DeleteConfirmationTicket";
import { observer } from "mobx-react-lite";
import Archives from "../Archives/Archives";
import DevConsole from "../Developer Console/DevConsole";
import UsersACP from "../ACP/UsersACP/UsersACP";
import RolesACP from "../ACP/RolesACP/RolesACP";
import ProductsACP from "../ACP/ProductsACP/ProductsACP";
import StatusesACP from "../ACP/StatusesACP/StatusesACP";
import UserManager from "../ACP/UsersACP/UserManager/UserManager";
import DeleteConfirmationUser from "../DeleteConfirmation/DeleteConfirmationUser";
import RolesManager from "../ACP/RolesACP/RolesManager/RolesManager";
import DeleteConfirmationRole from "../DeleteConfirmation/DeleteConfirmationRole";
import DeleteConfirmationProduct from "../DeleteConfirmation/DeleteConfirmationProduct";
import DeleteConfirmationStatus from "../DeleteConfirmation/DeleteConfirmationStatus";
import LoadingPage from "../Utility/Loader/LoadingPage";
import Error404 from "../Errors/Error404";
import {ToastContainer} from "react-toastify";
import Error403 from "../Errors/Error403";
import ProfileDefaultPage from "../Profile/ProfileDefault/ProfileDefaultPage";
import ProfileEditDetailsPage from "../Profile/EditDetails/ProfileEditDetailsPage";
import ProfileAvatarPage from "../Profile/EditAvatar/ProfileAvatarPage"
import ProfilePasswordPage from "../Profile/EditPassword/ProfilePasswordPage";
import MyTicketsPage from "../Profile/MyTickets/MyTicketsPage";

function App() {
  const store = useContext(Store);
  const { token, appLoaded, setAppLoaded } = store.commonStore;
  const { getCurrentUser, isLogged } = store.userStore;
  const { loadProducts } = store.productStore;
  const { loadStatuses } = store.statusStore;

  useEffect(() => {
    if (token) {
      getCurrentUser().finally(() => setAppLoaded(true));
      loadProducts();
      loadStatuses();
    } else {
      setAppLoaded(true);
    }
  }, [getCurrentUser, setAppLoaded, token, loadProducts, loadStatuses]);

  if(!appLoaded) {
    return(<LoadingPage loadingText="Loading"></LoadingPage>)
  }

  if (appLoaded && !isLogged) {
    return (
      <div id="App">
        <Navbar />
        <div id="mainContentBody">
        <ToastContainer position="top-right"/>
          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route path="/" component={LandingPage} />
            <Route path="/unauthorized" component={Error403}/>
            <Route component={Error404}/>
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
      <ToastContainer position="top-right"/>
        <Switch>
          <Route exact path={["/", "/tickets"]} component={Tickets} />
          <Route exact path="/tickets/new" component={TicketsNew} />
          <Route exact path="/tickets/:id" component={TicketDetails} />
          <Route
            exact
            path="/tickets/:id/delete"
            component={DeleteConfirmation}
          />
          <Route exact path="/tickets/:id/edit" component={TicketsEdit} />
          <Route
            exact
            path="/tickets/:id/developer-console"
            component={DevConsole}
          />

          <Route exact path="/archives" component={Archives} />

          <Route exact path={["/acp", "/acp/users/"]} component={UsersACP} />

          <Route exact path="/acp/users/:id" component={UserManager} />
          <Route exact path="/acp/users/:id/delete" component={DeleteConfirmationUser}/>

          <Route exact path="/acp/roles" component={RolesACP} />
          <Route exact path="/acp/roles/:id" component={RolesManager} />
          <Route exact path="/acp/roles/:id/delete" component={DeleteConfirmationRole}/>

          <Route exact path="/acp/products" component={ProductsACP} />
          <Route exact path="/acp/products/:id/delete" component={DeleteConfirmationProduct}/>

          <Route exact path="/acp/statuses" component={StatusesACP} />
          <Route exact path="/acp/statuses/:id/delete" component={DeleteConfirmationStatus}/>

          <Route exact path="/profile" component={ProfileDefaultPage} />
          <Route exact path="/profile/edit" component={ProfileEditDetailsPage} />
          <Route exact path="/profile/avatar" component={ProfileAvatarPage} />
          <Route exact path="/profile/security" component={ProfilePasswordPage} />
          <Route exact path="/profile/my-tickets" component={MyTicketsPage} />


          <Route path="/unauthorized" component={Error403}/>
          <Route component={Error404}/>


        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default observer(App);
