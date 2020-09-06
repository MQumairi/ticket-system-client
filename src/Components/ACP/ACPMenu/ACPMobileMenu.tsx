import React from "react";
import { Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

interface IProps {
  currentPage: string;
}

const ACPMobileMenu: React.FC<IProps> = ({ currentPage }) => {
  let item = "mobileProfileMenuItem";
  let activeItem = "mobileProfileMenuItem active";

  return (
    <div className="mobileProfileMenu">
      <Link
        to={"/acp/settings"}
        className={currentPage === "Settings" ? activeItem : item}
      >
        <Icon name="setting" />
        Settings
      </Link>

      <Link
        to={"/acp/users"}
        className={currentPage === "Users" ? activeItem : item}
      >
        <Icon name="users" />
        Users
      </Link>

      <Link
        to={"/acp/roles"}
        className={currentPage === "Roles" ? activeItem : item}
      >
        <Icon name="chess king" />
        Roles
      </Link>

      <Link
        to={"/acp/products"}
        className={currentPage === "Products" ? activeItem : item}
      >
        <Icon name="gift" />
        Products
      </Link>

      <Link
        to={"/acp/statuses"}
        className={currentPage === "Statuses" ? activeItem : item}
      >
        <Icon name="calendar check" />
        Statuses
      </Link>
    </div>
  );
};

export default observer(ACPMobileMenu);
