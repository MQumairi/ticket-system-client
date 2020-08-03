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
            <Grid.Column className="styleColumn">
              <StatusIcon
                iconName={"urgentIcon"}
                clickAble={true}
                content={status.status_text}
              />
            </Grid.Column>
          );
        })}
      </Grid>
    </div>
  );
};

export default observer(Status);
