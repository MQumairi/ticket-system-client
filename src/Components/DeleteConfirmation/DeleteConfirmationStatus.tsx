import React, { useState } from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useEffect, useContext } from "react";
import Store from "../App/Store/rootStore";
import { Grid, GridColumn, Button, Form } from "semantic-ui-react";
import { Form as FinalForm } from "react-final-form";
import "./deleteconfirm.css";
import { IStatus } from "../../Models/status";

interface params {
  id: string;
}
const DeleteConfirmationStatus: React.FC<RouteComponentProps<params>> = ({
  match,
  history,
}) => {
  const store = useContext(Store);
  const { statuses, deleteStatus } = store.statusStore;

  const [status, setStatus] = useState<IStatus | null>(null);

  useEffect(() => {

      let foundStatus = statuses.find((status) => {
        return status.status_id!.toString() === match.params.id;
      });

      if(foundStatus) setStatus(foundStatus);

  }, [statuses, match.params.id]);

  const handleFinalFormSubmit = (values: any) => {
    deleteStatus(match.params.id)
    .then(() => {
      history.push("/acp/statuses");
    });
  };

  if (!status || !statuses) return <div>404</div>;

  return (
    <div className="deleteConfirmBody">
      <Grid>
        <GridColumn width={12}>
          <h2>Product Deletion</h2>
        </GridColumn>
        <GridColumn width={3}>
          <Button
            className="mainButton"
            as={Link}
            to={"/acp/statuses"}
          >
            Back
          </Button>
        </GridColumn>
      </Grid>
      <hr />
      {status && (
        <div>
          <div>
            You're about to delete the status "{status.status_text}" from the system. This will set the status of any tickets associated with it to the default status.
            Are you sure you wish to proceed?
          </div>

          <div className="deleteConfirmButtons">
            <FinalForm
              onSubmit={handleFinalFormSubmit}
              render={({ handleSubmit }) => {
                return (
                  <Form onSubmit={handleSubmit}>
                    <Button className="mainButton" type="submit">
                      Delete
                    </Button>
                  </Form>
                );
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default observer(DeleteConfirmationStatus);
