import React, { useContext, useState, useEffect } from "react";
import Store from "../App/Store/rootStore";
import { ITicket } from "../../Models/ticket";
import { RouteComponentProps, Link } from "react-router-dom";
import "./ticketDetails.css";
import { Grid, Button } from "semantic-ui-react";
import StatusIcon from "../Tickets/FilterByDashboard/Status/StatusIcon/SatusIcon";

interface params {
  id: string;
}

const TicketDetails: React.FC<RouteComponentProps<params>> = ({ match }) => {
  const store = useContext(Store);
  const { getTicket } = store.ticketStore;

  const [currentTicket, setCurrentTicket] = useState<ITicket | undefined>(
    undefined
  );

  useEffect(() => {
    setCurrentTicket(getTicket(match.params.id));
  }, [getTicket, match.params.id]);

  if (currentTicket === undefined) return <div>Error 404</div>;

  return (
    <div id="ticketDetailsBody">
      <div id="ticketDetailsMainPost">
        {/* Header starts here */}
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              <h1>{currentTicket?.title}</h1>
              <p className="postHeaderDate">{currentTicket.date}</p>
            </Grid.Column>
            <Grid.Column>
              <Button
                as={Link}
                to="/tickets"
                floated="right"
                className="mainButton"
                content="Back"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <hr />
        {/* Body starts here */}
        <Grid id="ticketDetailsMainPostContent">
          <Grid.Row columns={2}>
            <Grid.Column width={12}>
              <p>{currentTicket?.author}</p>
            </Grid.Column>
            <Grid.Column width={4}>
              <StatusIcon content={currentTicket.status} clickAble={false} />
              <div className="productButton">{currentTicket.product}</div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <p>{currentTicket?.description}</p>
          </Grid.Row>
        </Grid>
        {/* Footer starts here */}
        <Grid>
            <Grid.Row columns={3}>
                <Grid.Column width={12}><Button className="mainButton">Reply</Button></Grid.Column>
                <Grid.Column width={2}><Button className="mainButton">Delete</Button></Grid.Column>
                <Grid.Column width={2}><Button className="mainButton">Edit</Button></Grid.Column>
            </Grid.Row>
        </Grid>
      </div>
    </div>
  );
};

export default TicketDetails;
