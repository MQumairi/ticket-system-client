import React, { useContext, useState } from "react";
import "./profile.css";
import { Grid, Button, Menu } from "semantic-ui-react";
import Store from "../App/Store/rootStore";
import Avatar from "../Users/Avatar/Avatar";
import { observer } from "mobx-react-lite";
import ProfileDefault from "./ProfileDefault/ProfileDefault";
import ProfileEditDetails from "./EditDetails/ProfileEditDetails";
import ProfileAvatar from "./EditAvatar/ProfileAvatar";
import ProfilePassword from "./EditPassword/ProfilePassword";
import MyTickets from "./MyTickets/MyTickets";

const Profile = () => {
  const store = useContext(Store);
  const { user, logout, loadDevTickets} = store.userStore;

  const [active, setActive] = useState<string>("Your Profile");

  return (
    <div id="profileBody">
      <Grid>
        <Grid.Row>
          <Grid.Column width={9}>
            <h1>
              {user?.first_name} {user?.surname}
            </h1>
            <h3>{user?.roles}</h3>
            <hr></hr>

            {active === "Your Profile" && <ProfileDefault />}
            {active === "Edit Details" && <ProfileEditDetails setActive={setActive} />}
            {active === "Avatar" && <ProfileAvatar setActive={setActive} />}
            {active === "Security" && <ProfilePassword setActive={setActive} />}
            {active === "My Tickets" && <MyTickets/>}

          </Grid.Column>
          <Grid.Column width={7} id="avatarCol">
            {user && (
              <Avatar avatar={user.avatar} diameter={120} borderWidth={3} />
            )}
            <Menu vertical id="avatarColMenu">
              <Menu.Item
                name="Your Profile"
                active={active === "Your Profile"}
                onClick={() => setActive("Your Profile")}
              />
              <Menu.Item
                name="Edit Details"
                active={active === "Edit Details"}
                onClick={() => setActive("Edit Details")}
              />
              <Menu.Item
                name="Avatar"
                active={active === "Avatar"}
                onClick={() => {
                  setActive("Avatar");
                }}
              />
              <Menu.Item
                name="Security"
                active={active === "Security"}
                onClick={() => {
                  setActive("Security");
                }}
              />
              {user?.roles && loadDevTickets(user.id!) && user?.roles[0]==="Developer" && <Menu.Item
                name="My Tickets"
                active={active === "My Tickets"}
                onClick={() => {
                  setActive("My Tickets");
                }}
              />}
            </Menu>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row width={16} className="logrow">
          {active === "Your Profile" && (
            <Button
              className="mainButton logoutButton"
              onClick={() => logout()}
            >
              Logout
            </Button>
          )}
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default observer(Profile);
