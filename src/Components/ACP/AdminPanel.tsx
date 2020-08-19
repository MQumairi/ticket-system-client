import React, { useContext, useState, useEffect } from "react";
import Store from "../App/Store/rootStore";
import "./adminPanel.css";
import { Grid, GridColumn, Menu } from "semantic-ui-react";
import UsersACP from "./UsersACP/UsersACP";
import { observer } from "mobx-react-lite";

const AdminPanel = () => {
  const store = useContext(Store);
  const { user, loadUserList } = store.userStore;

  useEffect(() => {
    loadUserList();
  }, [loadUserList]);

  const [active, setActive] = useState<string>("Users");

  if (!user?.roles?.includes("Admin")) return <div>No permission</div>;

  return (
    <div id="adminPanelBody">
      <h1>Admin Control Panel</h1>
      <hr />
      <Grid columns={2} className="ACPmainContent">
        <GridColumn width={11}>{active === "Users" && <UsersACP />}</GridColumn>
        <GridColumn width={5}>
          <Menu vertical id="avatarColMenu">
            <Menu.Item
              name="Users"
              active={active === "Users"}
              onClick={() => setActive("Users")}
            />
            <Menu.Item
              name="Roles"
              active={active === "Roles"}
              onClick={() => setActive("Roles")}
            />
            <Menu.Item
              name="Products"
              active={active === "Products"}
              onClick={() => {
                setActive("Products");
              }}
            />
            <Menu.Item
              name="Statuses"
              active={active === "Statuses"}
              onClick={() => {
                setActive("Statuses");
              }}
            />
          </Menu>
        </GridColumn>
      </Grid>
    </div>
  );
};

export default observer(AdminPanel);
