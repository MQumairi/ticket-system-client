import React, { useContext } from "react";
import "./statusIcon.css";
import TicketStore from "../../../../App/Store/ticketStore";

interface IProps {
  content: string;
  clickAble: boolean;
}

const SatusIcon: React.FC<IProps> = (props) => {
  const store = useContext(TicketStore);
  const { filterTicketsByStatus } = store;

  const handleClick = () => {
    if (props.clickAble) {
      filterTicketsByStatus(props.content);
    }
  };

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
    <button onClick={() => handleClick()} className="statusIcon">
      <div className={circleColor()}></div>
      <div className="statusContent">{props.content}</div>
    </button>
  );
};

export default SatusIcon;
