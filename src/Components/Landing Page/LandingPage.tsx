import React, { useContext } from "react";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./landingpage.css";
import Store from "../App/Store/rootStore";

const LandingPage = () => {
  const store = useContext(Store);
  const { user } = store.userStore;

  return (
    <div className="landing-box">
      <h1>Welcome to our ticketing system {user && ", " + user.username}</h1>
      <h3>
        {!user &&
          "To proceed, please either login, register an account, or access the system as a guest"}
        {user && "To proceed, click below"}
      </h3>
      <div className="landingPageButtons">
        {!user && (
          <Button className="mainButton" as={Link} to="/login">
            Login
          </Button>
        )}
        {!user && (
          <Button className="mainButton" as={Link} to="/tickets">
            Guest Access
          </Button>
        )}
        {!user && (
          <Button className="mainButton" as={Link} to="/register">
            Register
          </Button>
        )}
        {user && (
          <Button className="mainButton" as={Link} to="/tickets">
            Enter
          </Button>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
