import React, { useContext, useState } from "react";
import { Icon } from "semantic-ui-react";
import "./navbar.css";
import Avatar from "../Users/Avatar/Avatar";
import Store from "../App/Store/rootStore";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

const Navbar = () => {
  const store = useContext(Store);
  const { user } = store.userStore;

  const [burgerPressed, setBurgerPressed] = useState<boolean>(false);

  return (
    <div>
      <div id="navbar">
        {/* Logo */}
        <div className="navLogo">
          <h1 className="logo">
            <Link to={"/"}>YourCompany</Link>
          </h1>
        </div>

        {/*Navlinks */}
        <div className="navLinks">
          <Link to="/tickets">Tickets</Link>
          <Link to="/archives">Archive</Link>

          {user?.role && user.role.name === "Admin" && (
            <Link to="/acp">ACP</Link>
          )}

          {user == null && <Link to="/login">Login</Link>}
          {user == null && <Link to="/register">Register</Link>}
        </div>

        {user !== null && (
          <Link to="/profile" className="navAvatar">
            <Avatar avatar={user.avatar} diameter={60} borderWidth={3} />
          </Link>
        )}

        <div className="navBurger">
          <Icon
            link
            onClick={() => setBurgerPressed(!burgerPressed)}
            size="big"
            name="bars"
          />
        </div>
      </div>
      {burgerPressed && (
        <div className="mobileDropdown">
          <div className="navLinksMobile">
            <Link to="/tickets">Tickets</Link>
            <Link to="/archives">Archive</Link>
            {user?.role && user.role.name === "Admin" && (
              <Link to="/acp">ACP</Link>
            )}
            {user && <Link to="/profile">Profile</Link>}
            {user == null && <Link to="/login">Login</Link>}
            {user == null && <Link to="/register">Register</Link>}
          </div>
        </div>
      )}
    </div>
  );
};

export default observer(Navbar);
