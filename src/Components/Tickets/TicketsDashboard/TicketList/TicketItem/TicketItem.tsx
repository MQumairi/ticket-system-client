import React from "react";
import { Grid, Button } from "semantic-ui-react";
import "./ticketItem.css";
import { ITicket } from "../../../../../Models/ticket";
import StatusIcon from "../../../FilterByDashboard/Status/StatusIcon/SatusIcon";
import { Link } from "react-router-dom";
import Avatar from "../../../../Users/Avatar/Avatar";

interface IProps {
  ticket: ITicket;
}

const TicketItem: React.FC<IProps> = ({ ticket }) => {
  return (
    <Grid columns={6} className="ticketItem" stackable>
      <Grid.Column width={2}>
        <Avatar avatar={ticket.user.avatar} diameter={50} borderWidth={0} />
      </Grid.Column>
      <Grid.Column width={3}>
        <div className="ticketStatusCol">
          <StatusIcon clickAble={false} status={ticket.status} />
        </div>
      </Grid.Column>
      <Grid.Column width={2}>{ticket.product.product_name}</Grid.Column>
      <Grid.Column width={4}>{ticket.title}</Grid.Column>
      <Grid.Column width={3}>{ticket.date_time}</Grid.Column>
      <Grid.Column width={1}>
        <Button
          as={Link}
          to={"/tickets/" + ticket.post_id}
          className="mainButton"
        >
          View
        </Button>
      </Grid.Column>
    </Grid>
  );
};

export default TicketItem;
