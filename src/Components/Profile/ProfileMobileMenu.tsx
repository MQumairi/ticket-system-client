import React, { useContext } from "react";
import { Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Store from "../App/Store/rootStore";

interface IProps {
  currentPage: string;
}

const ProfileMobileMenu: React.FC<IProps> = ({currentPage}) => {
  const store = useContext(Store);
  const { user, loadDevTickets } = store.userStore;

  let item = "mobileProfileMenuItem";
  let activeItem = "mobileProfileMenuItem active";

  return (
    <div className="mobileProfileMenu">

      <Link to={"/profile"} className={currentPage === "Your Profile" ? activeItem : item}>
        <Icon name="user" />
        Profile
      </Link>

      <Link to={"/profile/edit"} className={currentPage === "Edit Details" ? activeItem : item}>
        <Icon name="edit" />
        Edit
      </Link>

      <Link to={"/profile/avatar"} className={currentPage === "Avatar" ? activeItem : item}>
        <Icon name="picture" />
        Avatar
      </Link>


      <Link to={"/profile/security"} className={currentPage === "Security" ? activeItem : item}>
        <Icon name="unlock alternate" />
        Security
      </Link>


      {user?.role &&
        user?.role.name === "Developer" &&
        loadDevTickets(user.id!) && (
          <Link to={"/profile/my-tickets"} className="mobileProfileMenuItem">
            <Icon name="ticket" />
            My Tickets
          </Link>
        )}
    </div>
  );
};

export default ProfileMobileMenu;
