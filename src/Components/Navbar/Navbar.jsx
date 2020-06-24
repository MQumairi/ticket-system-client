import React, { useState } from "react";
import { Menu, Segment } from "semantic-ui-react";
import "./navbar.css";
import avatar from "../../Assets/Images/avatar.png"

const Navbar = () => {
  const [activeItem, setActiveItem] = useState("Tickets");

  const handleItemClick = (e, { name }) => setActiveItem({ activeItem: name });

  const avatarStyle = {
    backgroundImage: "url(" + avatar + ")"
  }

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
              <div id="navAvatar" style={avatarStyle}/>
          </Menu.Item>
        </Menu>
      </div>
    </Segment>
  );
};

export default Navbar;
