import React, { useContext } from "react";
import "./statusIcon.css";
import TicketStore from "../../../../App/Store/ticketStore";
import { Button } from "semantic-ui-react";


interface IProps {
  content: string;
  clickAble: boolean;
}

const SatusIcon: React.FC<IProps> = (props) => {

  const store = useContext(TicketStore);
  const { setTicketsStatus } = store;

  const handleClick = () => {
    if(props.clickAble) {
      setTicketsStatus(props.content);
    }
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

  if(props.clickAble) {

  return (
    <Button className="no-style">
    <div onClick={() => handleClick()} className="statusIcon">
      <div className={circleColor()}></div>
      <div className="statusContent">{props.content}</div>
    </div>
    </Button>
  );
  } else {
    return (
      <div onClick={() => handleClick()} className="statusIcon">
      <div className={circleColor()}></div>
      <div className="statusContent">{props.content}</div>
    </div>
    )
  }
};

export default SatusIcon;
