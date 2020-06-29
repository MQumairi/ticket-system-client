import React, { useContext, useState, useEffect } from "react";
import ProductStore from "../../../App/Store/productStore";
import FilterStore from "../../../App/Store/filterStore";
import "./product.css";
import { observer } from "mobx-react-lite";

interface IProps {
  name: string;
  id: number;
}

const ProductItem: React.FC<IProps> = (props) => {
  const filterStore = useContext(FilterStore);
  const {
    filterTicketsByProduct,
    setProductFilterPicked,
    productFilterPicked,
  } = filterStore;

  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (productFilterPicked !== props.name) {
      setPressed(false);
    }
  }, [productFilterPicked, props.name]);

  const handleClick = (event: any) => {
    if (!pressed) {
      setProductFilterPicked(props.name);
      filterTicketsByProduct(props.name);
    } else {
      setProductFilterPicked("");
      filterTicketsByProduct(props.name);
    }
    setPressed(!pressed);
    console.log(props.name);
  };

  interface dynamicStyle {
    [key: string]: any;
  }

  let clickAbleStyle: dynamicStyle = {};

  if (pressed && productFilterPicked === props.name) {
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
