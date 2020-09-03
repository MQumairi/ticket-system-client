import React, { useContext, useEffect } from "react";
import Store from "../../App/Store/rootStore";
import { Grid, GridColumn, Button } from "semantic-ui-react";
import LoadingComp from "../../Utility/Loader/LoadingComp";
import { observer } from "mobx-react-lite";
import "./acpSettingsList.css";

interface IProps {
  setEditing: (editing: boolean) => void;
}

const ACPSettingsList: React.FC<IProps> = ({ setEditing }) => {
  const store = useContext(Store);
  const { loadACPSettings, ACPSettings, resourceLoading } = store.commonStore;

  useEffect(() => {
    loadACPSettings();
  }, [loadACPSettings]);

  if (resourceLoading) return <LoadingComp loadingText="Loading settings" />;

  return (
    <div className="acpSettingsListBody">
      <Grid>
        <GridColumn width={16}>
          <h4><span aria-label="Founder" role="img">👑</span> Founder</h4>
          <h2>{ACPSettings?.founder.username}</h2>
        </GridColumn>
        <GridColumn width={16}>
          <h4><span aria-label="Founder" role="img">👤</span> Registeration of New Users</h4>
          <h2>{ACPSettings?.registration_locked ? "Disabled" : "Enabled"}</h2>
        </GridColumn>
      </Grid>
      <hr/>
      <Button className="mainButton ticketNewSubmit" type="submit" onClick={() => setEditing(true)}>
        Edit
      </Button>
    </div>
  );
};

export default observer(ACPSettingsList);
