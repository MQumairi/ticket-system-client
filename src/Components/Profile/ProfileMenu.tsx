import React, { useContext } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Store from "../App/Store/rootStore";


interface IProps {
    currentPage: string;
  }

const ProfileMenu:React.FC<IProps> = (props: any) => {

    const store = useContext(Store);
    const { user, loadDevTickets } = store.userStore;

  return (
    <Menu vertical id="avatarColMenu">
      <Menu.Item
        name="Your Profile"
        active={props.currentPage === "Your Profile"}
        as={Link}
        to="/profile"
      />
      <Menu.Item
        name="Edit Details"
        active={props.currentPage === "Edit Details"}
        as={Link}
        to="/profile/edit"
      />
      <Menu.Item
        name="Avatar"
        active={props.currentPage === "Avatar"}
        as={Link}
        to="/profile/avatar"
      />
      <Menu.Item
        name="Security"
        active={props.currentPage === "Security"}
        as={Link}
        to="/profile/security"
      />
      {user?.role &&
        user?.role.name === "Developer" &&
        loadDevTickets(user.id!) && (
          <Menu.Item
            name="My Tickets"
            active={props.currentPage === "My Tickets"}
            as={Link}
            to="/profile/my-tickets"
          />
        )}
    </Menu>
  );
};

export default ProfileMenu;
