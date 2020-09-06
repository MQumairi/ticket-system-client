import React from "react";
import { Card, Button } from "semantic-ui-react";
import { IUser } from "../../../../../Models/user";
import Avatar from "../../../../Users/Avatar/Avatar";
import "./userCard.css";
import { Link } from "react-router-dom";

interface IProps {
  user: IUser;
}

const UserCard: React.FC<IProps> = ({ user }) => {
  return (
    <Card>
      <Card.Content>
        <Avatar avatar={user.avatar} diameter={100} borderWidth={2} />
        <div className="userInfo">
          <Card.Header>{user.username}</Card.Header>
          {user.role && <Card.Meta>{user.role.name}</Card.Meta>}
          {!user.role && <Card.Meta>No role</Card.Meta>}
        </div>
        <div className="userManageButton">
        <Button
          className="mainButton"
          content="Manage"
          as={Link}
          to={"/acp/users/" + user.id}
        />
        </div>
      </Card.Content>
    </Card>
  );
};

export default UserCard;
