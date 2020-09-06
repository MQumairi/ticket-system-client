import React, { useContext } from "react";
import "./profile.css";
import { Button } from "semantic-ui-react";
import Store from "../App/Store/rootStore";
import Avatar from "../Users/Avatar/Avatar";
import { observer } from "mobx-react-lite";
import { history } from "../../index";
import ProfileMenu from "./ProfileMenu";
import ProfileMobileMenu from "./ProfileMobileMenu";

interface IProps {
  currentPage: string;
}

const Profile: React.FC<IProps> = (props: any) => {
  const store = useContext(Store);
  const { user, logout } = store.userStore;

  const handleLogout = () => {
    logout();
    history.push("/");
  };

  return (
    <div>
      <ProfileMobileMenu currentPage={props.currentPage} />

      <div id="profileBody">

        <div className="profileHeader">

          <div className="profileInfo">
            <h1>
              {user?.first_name} {user?.surname}
            </h1>
            <h3>{user?.role?.name}</h3>
            <hr></hr>

            {props.children}
          </div>

          <div className="avatarCol">
            {user && (
              <Avatar avatar={user.avatar} diameter={120} borderWidth={3} />
            )}

            <ProfileMenu currentPage={props.currentPage} />
          </div>
        </div>

        <div className="logRow">
          {props.currentPage === "Your Profile" && (
            <Button
              className="mainButton logoutButton"
              onClick={() => handleLogout()}
            >
              Logout
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default observer(Profile);
