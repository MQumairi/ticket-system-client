import React, { useContext } from "react";
import { Grid } from "semantic-ui-react";
import StatusIcon from "./StatusIcon/SatusIcon";
import Store from "../../../App/Store/rootStore";
import "./status.css";
import { observer } from "mobx-react-lite";

const Status = () => {
  const store = useContext(Store);
  const { statuses } = store.statusStore;

  return (
    <div>
      <h4 className="filterTitle">Status</h4>
      <Grid columns={2} className="styleGrid">
        {statuses.map((status) => {
          return (
            <Grid.Column key={status.status_id} className="styleColumn">
              <StatusIcon
                clickAble={true}
                status={status}
              />
            </Grid.Column>
          );
        })}
      </Grid>
    </div>
  );
};

export default observer(Status);
