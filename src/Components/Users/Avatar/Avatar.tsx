import React, { useContext } from "react";
import Store from "../../App/Store/rootStore";
import "./avatar.css";

interface IProps {
  userId: string;
  diameter: number;
  borderWidth: number;
}

const Avatar: React.FC<IProps> = (props) => {
  const store = useContext(Store);
  const { getUser } = store.userStore;

  const avatarStyle = {
    backgroundImage: "url(" + getUser(props.userId)?.avatar + ")",
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
