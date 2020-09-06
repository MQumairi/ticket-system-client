import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

interface IProps {
  currentPage: string;
}

const ACPMenu: React.FC<IProps> = ({currentPage}) => {

  return (
    <Menu vertical id="avatarColMenu">
      <Menu.Item
        name="Settings"
        active={currentPage === "Settings"}
        as={Link}
        to="/acp/settings"
      />
      <Menu.Item
        name="Users"
        active={currentPage === "Users"}
        as={Link}
        to="/acp/users"
      />
      <Menu.Item
        name="Roles"
        active={currentPage === "Roles"}
        as={Link}
        to="/acp/roles"
      />
      <Menu.Item
        name="Products"
        active={currentPage === "Products"}
        as={Link}
        to="/acp/products"
      />
      <Menu.Item
        name="Statuses"
        active={currentPage === "Statuses"}
        as={Link}
        to="/acp/statuses"
      />
    </Menu>
  );
};

export default observer(ACPMenu);
