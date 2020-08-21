import React from "react";
import { Card, Button } from "semantic-ui-react";
import { IUser } from "../../../../../Models/user";
import Avatar from "../../../../Users/Avatar/Avatar";
import "./userCard.css";

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
          {user.roles && user.roles.length > 0 && <Card.Meta>{user.roles[0]}</Card.Meta>}
          {user.roles?.length === 0 && <Card.Meta>No role</Card.Meta>}
        </div>
        <Button
          className="mainButton ticketNewSubmit"
          content="Manage"
        />
      </Card.Content>
    </Card>
  );
};

export default UserCard;
