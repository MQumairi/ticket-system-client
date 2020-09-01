import React, { useContext } from "react";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./landingpage.css"
import Store from "../App/Store/rootStore";

const LandingPage = () => {
  const store = useContext(Store);
  const {user} = store.userStore;

  return (
    <div className="landing-box">
      <h1>Welcome to our ticketing system</h1>
      <h3>
        To proceed, please login or register an account
      </h3>
      {!user && <Button className="mainButton" as={Link} to="/login">Login</Button>}
      {!user && <Button className="mainButton" as={Link} to="/tickets">Guest Access</Button>}
      {!user && <Button className="mainButton" as={Link} to="/register">Register</Button>}
      {user && <Button className="mainButton" as={Link} to="/tickets">Enter</Button>}
    </div>
  );
};

export default LandingPage;
