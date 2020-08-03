import React from "react";
import "./avatar.css";

interface IProps {
  avatar: string;
  diameter: number;
  borderWidth: number;
}

const Avatar: React.FC<IProps> = (props) => {

  const avatarStyle = {
    backgroundImage: "url(" + props.avatar + ")",
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
