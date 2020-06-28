import React, { useContext, useState } from "react";
import "./statusIcon.css";
import TicketStore from "../../../../App/Store/ticketStore";

interface IProps {
  content: string;
  clickAble: boolean;
  iconName?: string;
}

const SatusIcon: React.FC<IProps> = (props) => {
  const [clicked, setClicked] = useState(false);

  const store = useContext(TicketStore);
  const { filterTicketsByStatus } = store;

  const handleClick = (event: any) => {
    if (props.clickAble) {
      filterTicketsByStatus(props.content);
    }

    if(event.currentTarget.name === props.iconName) {
      setClicked(!clicked);
    }
  };

  interface dynamicStyle {
    [key: string]: any;
  }

  let clickAbleStyle: dynamicStyle = {};

  if (props.clickAble) {
    clickAbleStyle.cursor = "pointer";
  }

  if (clicked) {
    clickAbleStyle.border = "solid 1px green";
  }

  const circleColor = () => {
    switch (props.content) {
      case "Urgent":
        return "circle-red";
      case "Low":
        return "circle-orange";
      case "Pending":
        return "circle-yellow";
      case "Done":
        return "circle-green";
      default:
        return "circle-red";
    }
  };

  return (
    <button
      name={props.iconName}
      onClick={(e) => handleClick(e)}
      className="statusIcon"
      style={clickAbleStyle}
    >
      <div className={circleColor()}></div>
      <div className="statusContent">{props.content}</div>
    </button>
  );
};

export default SatusIcon;
