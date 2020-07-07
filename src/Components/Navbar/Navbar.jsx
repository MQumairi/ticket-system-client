import React, { useState } from "react";
import { Menu, Segment } from "semantic-ui-react";
import "./navbar.css";
import Avatar from "../Users/Avatar/Avatar";

const Navbar = () => {
  const [activeItem, setActiveItem] = useState("Tickets");

  const handleItemClick = (e, { name }) => setActiveItem({ activeItem: name });

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
            onClick={handleItemClick}
          />
          <Menu.Item
            name="Products"
            active={activeItem === "Products"}
            onClick={handleItemClick}
          />
          <Menu.Item
            name="Users"
            active={activeItem === "Users"}
            onClick={handleItemClick}
          />
          <Menu.Item>
              <Avatar userId={"1"} diameter={60} borderWidth={3}/>
          </Menu.Item>
        </Menu>
      </div>
    </Segment>
  );
};

export default Navbar;
