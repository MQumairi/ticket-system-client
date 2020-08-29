import React, { useContext, useState } from "react";
import Store from "../../../App/Store/rootStore";
import { Card, Button } from "semantic-ui-react";
import ProductListCard from "./StatusListCard/StatusListCard";
import "./statusList.css";
import StatusAddForm from "./StatusAddForm";
import { observer } from "mobx-react-lite";

const StatusList = () => {
  const store = useContext(Store);
  const { statuses } = store.statusStore;

    const [addingStatus, setAddingStatus] = useState<boolean>(false);

  return (
    <div className="statusListContainer">
      <Card.Group itemsPerRow={1}>
        {statuses.sort((s1, s2) => ('' + s1.status_text).localeCompare(s2.status_text)).map((status) => {
          return (<ProductListCard status={status}/>);
        })}
      </Card.Group>
      <hr/>
      {!addingStatus && <Button className="mainButton ticketNewSubmit" onClick={() => setAddingStatus(true)}>Add Status</Button>}
      {addingStatus && <StatusAddForm setAddingStatus={setAddingStatus}/>}
    </div>
  );
};

export default observer(StatusList);
