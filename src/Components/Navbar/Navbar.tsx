import React, { useContext, useState } from "react";
import { Menu, Segment, Icon } from "semantic-ui-react";
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

        {/* <Menu stackable inverted secondary>
          <Menu.Item name="Tickets" as={Link} to="/tickets" />
          <Menu.Item name="Archive" as={Link} to="/archives" />
          {user?.role && user.role.name === "Admin" && <Menu.Item name="ACP" as={Link} to="/acp" />}
          {user && (
            <Menu.Item as={Link} to="/profile">
              <Avatar avatar={user.avatar} diameter={60} borderWidth={3}/>
            </Menu.Item>
          )}
          {!user && (
            <Menu.Item name="Login" as={Link} to="/login"/>
          )}
          {!user && (
            <Menu.Item name="Register" as={Link} to="/register"/>
          )}
          
        </Menu> */}
      </div>
      {burgerPressed && (
        <div className="mobileDropdown">
          <div className="navLinksMobile">
            <Link to="/tickets">Tickets</Link>
            <Link to="/archives">Archive</Link>
            {user?.role && user.role.name === "Admin" && (
              <Link to="/acp">ACP</Link>
            )}
            <Link to="/profile">Profile</Link>
            {user == null && <Link to="/login">Login</Link>}
            {user == null && <Link to="/register">Register</Link>}
          </div>
        </div>
      )}
    </div>
  );
};

export default observer(Navbar);
