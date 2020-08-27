import React, { useContext, useState } from "react";
import "./statusIcon.css";
import Store from "../../../../App/Store/rootStore";
import { observer } from "mobx-react-lite";
import { IStatus } from "../../../../../Models/status";

interface IProps {
  status: IStatus;
  clickAble: boolean;
}

const SatusIcon: React.FC<IProps> = (props) => {
  const [pressed, setPressed] = useState(false);

  const store = useContext(Store);
  const {filters, filterStatuses} = store.filterStore;
  const {status_ids} = store.statusStore;

  let clickAbleStyle: dynamicStyle = {};

  const handleClick = () => {
    if (props.clickAble) {
      if (!pressed) {
        if (filters.status_ids.length === status_ids.length) {
          filters.product_ids = [];
        }
        filterStatuses(props.status.status_id!, "add");
      } else {
        filterStatuses(props.status.status_id!, "remove");
      }
      setPressed(!pressed);
    }
  };

  interface dynamicStyle {
    [key: string]: any;
  }


  if (props.clickAble) {
    clickAbleStyle.cursor = "pointer";
    clickAbleStyle.marginTop = "10px";

    if (filters.status_ids.includes(props.status.status_id!)) {
      clickAbleStyle.border = "solid 2px green";
    }
  }

 

  const circleColor = () => {
    return {backgroundColor: props.status.status_color}
  };

  return (
    <button
      name={props.status.status_id?.toString()}
      onClick={() => handleClick()}
      className="statusIcon"
      style={clickAbleStyle}
    >
      <div className="circle" style={circleColor()}></div>
      <div className="statusContent">{props.status.status_text}</div>
    </button>
  );
};

export default observer(SatusIcon);
