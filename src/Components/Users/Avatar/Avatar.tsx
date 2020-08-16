import React from "react";
import "./avatar.css";
import { IAvatar } from "../../../Models/avatar";

interface IProps {
  avatar: IAvatar;
  diameter: number;
  borderWidth: number;
}

const Avatar: React.FC<IProps> = (props) => {

  let avatar_url : string;

  if(props.avatar == null) {
    avatar_url = "https://vignette.wikia.nocookie.net/jjba/images/0/01/JotaroProfile.png/revision/latest/scale-to-width-down/340?cb=20191125014406";
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
