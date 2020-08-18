import React from "react";
import { ITicket } from "../../../../Models/ticket";
import { Grid } from "semantic-ui-react";
import "./ticketItemSmall.css";

interface IProps {
  ticket: ITicket;
}

const TicketItemSmall: React.FC<IProps> = ({ ticket }) => {

  const statusColor = {
    backgroundColor: ticket.status.status_color,
  };

  return (
    <div>
      <Grid columns={3} className="ticketItemSmall" stackable>
        <Grid.Column width={2}><div className="statusCirc" style={statusColor}/></Grid.Column>
        <Grid.Column widht={4} className="ticketItemSmallText">{ticket.product.product_name}</Grid.Column>
        <Grid.Column width={7} className="ticketItemSmallText">{ticket.title}</Grid.Column>
      </Grid>
    </div>
  );
};

export default TicketItemSmall;
