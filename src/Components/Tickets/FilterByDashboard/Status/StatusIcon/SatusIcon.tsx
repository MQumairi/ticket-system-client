import React, { useContext, useState, useEffect } from "react";
import "./statusIcon.css";
import FilterStore from "../../../../App/Store/filterStore";
import { observer } from "mobx-react-lite";

interface IProps {
  content: string;
  clickAble: boolean;
  iconName?: string;
}

const SatusIcon: React.FC<IProps> = (props) => {
  const [pressed, setPressed] = useState(false);

  const store = useContext(FilterStore);
  const {
    filters,
    filterTickets,
    changeStatus
  } = store;

  const filtersDervied = {...filters}

  useEffect(() => {
    if (!filters.status.includes(props.content)) {
      setPressed(false);
    }
  }, [filters, props.content]);

  const handleClick = () => {
    if (props.clickAble) {
      if (!pressed) {
        changeStatus(props.content, true);
        filterTickets();
      } else {
        changeStatus(props.content, false);
        filterTickets();
      }
      setPressed(!pressed);
      console.log("Status: " + filtersDervied.status)
      console.log("Products: " + filtersDervied.products)
      console.log("Dates: " + filtersDervied.dates)

    }
  };

  interface dynamicStyle {
    [key: string]: any;
  }

  let clickAbleStyle: dynamicStyle = {};

  if (props.clickAble) {
    clickAbleStyle.cursor = "pointer";
  }

  if (pressed && filters.status.includes(props.content)) {
    clickAbleStyle.border = "solid 2px green";
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
      onClick={() => handleClick()}
      className="statusIcon"
      style={clickAbleStyle}
    >
      <div className={circleColor()}></div>
      <div className="statusContent">{props.content}</div>
    </button>
  );
};

export default observer(SatusIcon);
