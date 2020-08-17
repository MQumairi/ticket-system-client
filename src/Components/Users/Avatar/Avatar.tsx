import React from "react";
import "./avatar.css";
import { IAvatar } from "../../../Models/avatar";
import defaultAvatar from "../../../Assets/Images/defaultAvatar.png"; 

interface IProps {
  avatar: IAvatar;
  diameter: number;
  borderWidth: number;
}

const Avatar: React.FC<IProps> = (props) => {

  let avatar_url : string;

  if(props.avatar == null) {
    avatar_url = defaultAvatar;
  } else {
    avatar_url = props.avatar.url;
  }


  const avatarStyle = {
    backgroundImage: "url(" + avatar_url + ")",
    width: props.diameter + "px",
    height: props.diameter + "px",
    border: props.borderWidth + "px solid var(--body-bg-color-3)",
  };

  return (
    <div>
      <div className="avatarStyle" style={avatarStyle} />
    </div>
  );
};

export default Avatar;
