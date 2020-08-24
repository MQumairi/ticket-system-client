import React, { useContext, useState, useEffect } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import Store from "../../App/Store/rootStore";
import { observer } from "mobx-react-lite";
import ACPMenu from "../ACPMenu/ACPMenu";
import ProductList from "./ProductList/ProductList";
import "../adminPanel.css";

const UsersACP = () => {
  const store = useContext(Store);
  const {loadProducts} = store.productStore;
  const [active, setActive] = useState<string>("Products");

   useEffect(() => {
    loadProducts();
    }, [loadProducts]);

  return (
    <div id="adminPanelBody">
      <h1>Admin Control Panel</h1>
      <hr />
      <Grid columns={2} className="ACPmainContent">
        <GridColumn width={11}>
          <ProductList/>
        </GridColumn>
        <GridColumn width={5}>
          <ACPMenu active={active} setActive={setActive}/>
        </GridColumn>
      </Grid>
    </div>
  );
};

export default observer(UsersACP);
