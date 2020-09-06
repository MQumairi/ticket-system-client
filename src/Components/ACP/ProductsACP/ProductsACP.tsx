import React, { useContext, useEffect } from "react";
import Store from "../../App/Store/rootStore";
import { observer } from "mobx-react-lite";
import ProductList from "./ProductList/ProductList";
import "../adminPanel.css";
import AdminPanel from "../AdminPanel";

const UsersACP = () => {
  const store = useContext(Store);
  const { loadProducts } = store.productStore;

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <AdminPanel currentPage="Products">
      <ProductList />
    </AdminPanel>
  );
};

export default observer(UsersACP);
