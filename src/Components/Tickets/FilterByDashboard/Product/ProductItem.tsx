import React, { useContext, useState, useEffect } from "react";
import Store from "../../../App/Store/rootStore";
import "./product.css";
import { observer } from "mobx-react-lite";

interface IProps {
  name: string;
  id: number;
}

const ProductItem: React.FC<IProps> = (props) => {

  const store = useContext(Store);
  const {filterProducts} = store.filterStore;

  const [pressed, setPressed] = useState(false);

  const handleClick = (event: any) => {
    filterProducts(props.id)
    setPressed(!pressed);
  };

  interface dynamicStyle {
    [key: string]: any;
  }

  let clickAbleStyle: dynamicStyle = {};

  if (pressed) {
    clickAbleStyle.border = "solid 2px green";
  }

  return (
    <button
      onClick={(e) => {
        handleClick(e);
      }}
      className="productItem"
      key={props.id}
      name={props.name}
      style={clickAbleStyle}
    >
      {props.name}
    </button>
  );
};

export default observer(ProductItem);
