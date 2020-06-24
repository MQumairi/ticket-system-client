import React from "react";
import {Grid} from "semantic-ui-react";
import "./ticketItem.css";

const TicketItem = ({ ticket }) => {
  return (
    <Grid columns={6} className="ticketItem" stackable>
      <Grid.Column width={2}>
        {ticket.author}
      </Grid.Column>
      <Grid.Column width={1}>
      {ticket.id}
      </Grid.Column>
      <Grid.Column width={3}>
      {ticket.status}
      </Grid.Column>
      <Grid.Column width={3}>
      {ticket.product}
      </Grid.Column>
      <Grid.Column width={4}>
      {ticket.title}
      </Grid.Column>
      <Grid.Column width={3}>
      {ticket.date}
      </Grid.Column>
    </Grid>
  );
};

export default TicketItem;
