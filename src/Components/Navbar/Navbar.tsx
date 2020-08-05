import React, { useState, useContext, useEffect } from "react";
import { Menu, Segment } from "semantic-ui-react";
import "./navbar.css";
import Avatar from "../Users/Avatar/Avatar";
import Store from "../App/Store/rootStore";
import { observer } from "mobx-react-lite";

const Navbar = () => {

  const [activeItem] = useState("Tickets");


  const store = useContext(Store);
  const {user, isLogged} = store.userStore;
  const {appLoaded} = store.commonStore;

  return (
    <Segment inverted>
      <div id="navbarMeu">
        <div className="logoBar">
          <h1 className="logo">YourCompany</h1>
        </div>
        <Menu inverted secondary>
          <Menu.Item
            name="Tickets"
            active={activeItem === "Tickets"}
          />
          <Menu.Item
            name="Products"
            active={activeItem === "Products"}
          />
          <Menu.Item
            name="Users"
            active={activeItem === "Users"}
          />
          {isLogged && user && appLoaded && <Menu.Item>
              <Avatar avatar={user.avatar} diameter={60} borderWidth={3}/>
          </Menu.Item>}
        </Menu>
      </div>
    </Segment>
  );
};

export default observer(Navbar);
