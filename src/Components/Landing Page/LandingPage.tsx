import React from "react";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./landingpage.css"

const LandingPage = () => {
  return (
    <div className="landing-box">
      <h1>Welcome to our ticketing system</h1>
      <h3>
        To proceed, please login or register an account
      </h3>
      <Button className="mainButton" as={Link} to="/login">Login</Button>
      <Button className="mainButton" as={Link} to="/register">Register</Button>
    </div>
  );
};

export default LandingPage;
