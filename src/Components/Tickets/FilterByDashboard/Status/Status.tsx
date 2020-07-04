import React, { useContext } from "react";
import { Grid } from "semantic-ui-react";
import StatusIcon from "./StatusIcon/SatusIcon";
import Store from "../../../App/Store/rootStore";
import "./status.css";

const Status = () => {
  const store = useContext(Store);
  const { stati } = store.filterStore;

  return (
    <div>
      <h4 className="filterTitle">Status</h4>
      <Grid columns={2} className="styleGrid">
        {stati.map((status) => {
          return (
          <Grid.Column className="styleColumn">
            <StatusIcon
              iconName={"urgentIcon"}
              clickAble={true}
              content={status.name}
            />
          </Grid.Column>)
        })}
      </Grid>
    </div>
  );
};

export default Status;
