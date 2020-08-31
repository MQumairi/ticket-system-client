import React, { useContext } from "react";
import "./profile.css";
import { Grid, Button, Menu } from "semantic-ui-react";
import Store from "../App/Store/rootStore";
import Avatar from "../Users/Avatar/Avatar";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

interface IProps {
  currentPage: string;
}

// Don't forget to change component signature:
// const ActivityDashboard: React.FC<IProps> = ({
//List props here (seperated by ",")
// }) => {

const Profile: React.FC<IProps> = (props: any) => {
  const store = useContext(Store);
  const { user, logout, loadDevTickets } = store.userStore;

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

            {props.children}
          </Grid.Column>
          <Grid.Column width={7} id="avatarCol">
            {user && (
              <Avatar avatar={user.avatar} diameter={120} borderWidth={3} />
            )}
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
              {user?.roles &&
                user?.roles[0] === "Developer" &&
                loadDevTickets(user.id!) && (
                  <Menu.Item
                    name="My Tickets"
                    active={props.currentPage === "My Tickets"}
                    as={Link}
                    to="/profile/my-tickets"
                  />
                )}
            </Menu>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row width={16} className="logrow">
          {props.currentPage === "Your Profile" && (
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
