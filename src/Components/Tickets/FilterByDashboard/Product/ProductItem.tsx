import React, { useContext, useState } from "react";
import Store from "../../../App/Store/rootStore";
import "./product.css";
import { observer } from "mobx-react-lite";

interface IProps {
  name: string;
  id: number;
}

const ProductItem: React.FC<IProps> = (props) => {
  const store = useContext(Store);
  const { filters, filterProducts } = store.filterStore;
  const { product_ids } = store.productStore;

  const [pressed, setPressed] = useState(false);

  const handleClick = () => {
    if (!pressed) {
      if (filters.product_ids.length === product_ids.length) {
        filters.product_ids = [];
      }
      filterProducts(props.id, "add");
    } else {
      filterProducts(props.id, "remove");
    }
    setPressed(!pressed);
  };

  interface dynamicStyle {
    [key: string]: any;
  }

  let clickAbleStyle: dynamicStyle = {};

  if (filters.product_ids.includes(props.id)) {
    clickAbleStyle.border = "solid 2px green";
  }

  return (
    <button
      onClick={() => {
        handleClick();
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
