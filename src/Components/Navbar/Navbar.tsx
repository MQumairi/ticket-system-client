import React, { useContext } from "react";
import { Menu, Segment } from "semantic-ui-react";
import "./navbar.css";
import Avatar from "../Users/Avatar/Avatar";
import Store from "../App/Store/rootStore";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

const Navbar = () => {

  const store = useContext(Store);
  const { user, isLogged, logout } = store.userStore;
  const {appLoaded} = store.commonStore;

  if (!isLogged && appLoaded) {
    return (
      <Segment inverted>
      <div id="navbarMeu">
        <div className="logoBar">
          <h1 className="logo">YourCompany</h1>
        </div>
      </div>
      </Segment>
    );
  }
  
  return (
    <Segment inverted>
      <div id="navbarMeu">
        <div className="logoBar">
          <h1 className="logo">YourCompany</h1>
        </div>
        <Menu inverted secondary>
          <Menu.Item name="Tickets" as={Link} to="/tickets" />
          <Menu.Item name="Logout" onClick={() => logout()}/>
          {user && (
            <Menu.Item>
              <Avatar avatar={user.avatar} diameter={60} borderWidth={3} />
            </Menu.Item>
          )}
        </Menu>
      </div>
    </Segment>
  );
};

export default observer(Navbar);
