import React from "react";
import {Grid, Button} from "semantic-ui-react";
import "./ticketItem.css";
import {ITicket} from "../../../../../Models/ticket"
import StatusIcon from "../../../FilterByDashboard/Status/StatusIcon/SatusIcon"
import { Link } from "react-router-dom";
import Avatar from "../../../../Users/Avatar/Avatar";

interface IProps {
  ticket: ITicket;
}

const TicketItem: React.FC<IProps> = ({ ticket }) => {
  return (
    <Grid columns={6} className="ticketItem" stackable>
      <Grid.Column width={2}>
        <Avatar userId={ticket.authorId.toString()} diameter={50} borderWidth={0}/>
      </Grid.Column>
      <Grid.Column width={3}>
        <div className="ticketStatusCol"><StatusIcon clickAble={false} content={ticket.status}/></div>
      </Grid.Column>
      <Grid.Column width={2}>
      {ticket.product}
      </Grid.Column>
      <Grid.Column width={4}>
      {ticket.title}
      </Grid.Column>
      <Grid.Column width={3}>
      {ticket.date}
      </Grid.Column>
      <Grid.Column width={1}>
      <Button as={Link} to={"/tickets/" + ticket.id} className="mainButton">View</Button>
      </Grid.Column>
    </Grid>
  );
};

export default TicketItem;
