import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

interface IProps {
  active: string;
  setActive: (active: string) => void

}

const ACPMenu: React.FC<IProps> = ({active, setActive}) => {

  return (
    <Menu vertical id="avatarColMenu">
      <Menu.Item
        name="Settings"
        active={active === "Settings"}
        onClick={() => setActive("Settings")}
        as={Link}
        to="/acp/settings"
      />
      <Menu.Item
        name="Users"
        active={active === "Users"}
        onClick={() => setActive("Users")}
        as={Link}
        to="/acp/users"
      />
      <Menu.Item
        name="Roles"
        active={active === "Roles"}
        onClick={() => setActive("Roles")}
        as={Link}
        to="/acp/roles"
      />
      <Menu.Item
        name="Products"
        active={active === "Products"}
        onClick={() => {
          setActive("Products");
        }}
        as={Link}
        to="/acp/products"
      />
      <Menu.Item
        name="Statuses"
        active={active === "Statuses"}
        onClick={() => {
          setActive("Statuses");
        }}
        as={Link}
        to="/acp/statuses"
      />
    </Menu>
  );
};

export default ACPMenu;
