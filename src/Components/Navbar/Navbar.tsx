import React, { useContext } from "react";
import { Menu, Segment } from "semantic-ui-react";
import "./navbar.css";
import Avatar from "../Users/Avatar/Avatar";
import Store from "../App/Store/rootStore";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

const Navbar = () => {

  const store = useContext(Store);
  const { user } = store.userStore;
  
  return (
    <Segment inverted>
      <div id="navbarMeu">
        <div className="logoBar">
          <h1 className="logo"><Link to={"/"}>YourCompany</Link></h1>
        </div>
        <Menu inverted secondary>
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
          
        </Menu>
      </div>
    </Segment>
  );
};

export default observer(Navbar);
