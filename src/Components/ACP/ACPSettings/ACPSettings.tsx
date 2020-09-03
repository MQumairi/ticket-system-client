import React, { useState } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import ACPMenu from "../ACPMenu/ACPMenu";
import ACPSettingsList from "./ACPSettingsList";
import ACPSettingsEdit from "./ACPSettingsEdit";

const ACPSettings = () => {
  const [active, setActive] = useState<string>("Settings");

  const [editing, setEditing] = useState<boolean>(false);

  return (
    <div id="adminPanelBody">
      <h1>Admin Control Panel</h1>
      <hr />
      <Grid columns={2} className="ACPmainContent">
        <GridColumn width={11}>
          {!editing && <ACPSettingsList setEditing={setEditing} />}
          {editing && <ACPSettingsEdit setEditing={setEditing} />}
        </GridColumn>
        <GridColumn width={5}>
          <ACPMenu active={active} setActive={setActive} />
        </GridColumn>
      </Grid>
    </div>
  );
};

export default ACPSettings;
