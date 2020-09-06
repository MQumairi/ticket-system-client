import React from "react";
import Avatar from "../Users/Avatar/Avatar";
import { IUser } from "../../Models/user";

interface IProps {
  user: IUser;
}

const AuthorAvatar: React.FC<IProps> = ({ user }) => {
  return (
    <div className="authorInfo">
      <div className="authorAvatar">
        <Avatar avatar={user.avatar} diameter={80} borderWidth={4} />
      </div>

      <div className="authorNameAndRank">
        <h2 className="posterName">{user.username}</h2>
        <h4 className="posterRank">{user.role?.name}</h4>
      </div>
    </div>
  );
};

export default AuthorAvatar;
