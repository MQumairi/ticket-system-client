import React, { useState } from "react";
import { Card, Button, Grid, Icon } from "semantic-ui-react";
import "./statusListCard.css";
import StatusListCardEditForm from "./StatusListCardEditForm";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { IStatus } from "../../../../../Models/status";

interface IProps {
  status: IStatus;
}

const StatusListCard: React.FC<IProps> = ({ status }) => {
  const [editingStatus, setEditingStatus] = useState<boolean>(false);

  return (
    <Card className="statusCard">
      {!editingStatus && (
        <Card.Content>
          <div className="cardRow">
            <div className="cardName">
              <Grid columns={3}>
                <Grid.Column>
                  <div
                    className="statusACPCircle"
                    style={{ backgroundColor: status.status_color }}
                  ></div>
                </Grid.Column>
                <Grid.Column>
                  <h4>{status.status_text}</h4>
                </Grid.Column>
                <Grid.Column>
                  {status.is_default && <Icon circular inverted name="star" />}
                </Grid.Column>
              </Grid>
            </div>
            <Button.Group>
              <Button
                className="mainButton cardEditButton"
                onClick={() => setEditingStatus(true)}
              >
                Edit
              </Button>
              <Button
                className="mainButton cardDelButton"
                as={Link}
                to={"/acp/statuses/" + status.status_id + "/delete"}
                disabled={status.is_default}
              >
                Delete
              </Button>
            </Button.Group>
          </div>
        </Card.Content>
      )}
      {editingStatus && (
        <Card.Content>
          <StatusListCardEditForm
            status={status}
            setEditingStatus={setEditingStatus}
          />
        </Card.Content>
      )}
    </Card>
  );
};

export default observer(StatusListCard);
