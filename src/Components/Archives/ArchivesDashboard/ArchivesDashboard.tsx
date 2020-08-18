import React, { useContext } from 'react'
import Store from '../../App/Store/rootStore';
import { Grid } from 'semantic-ui-react';
import TicketList from '../../Tickets/TicketsDashboard/TicketList/TicketList';

const ArchivesDashboard = () => {
    const store = useContext(Store);
    const {
      archivesRegistry,
    } = store.ticketStore;
    
    return (
        <div id="TicketDashboard">
            <h2>Archives</h2>
            <hr/>
            <Grid columns={6} id="ticketsHeader">
                <Grid.Column width={2} className="remove-padding table-header">Author</Grid.Column>
                <Grid.Column width={3} className="remove-padding table-header">Status</Grid.Column>
                <Grid.Column width={2} className="remove-padding table-header">Product</Grid.Column>
                <Grid.Column width={4} className="remove-padding table-header">Title</Grid.Column>
                <Grid.Column width={3} className="remove-padding table-header">Date</Grid.Column>
                <Grid.Column width={2} className="remove-padding table-header"></Grid.Column>
            </Grid>
            <hr/>
            <TicketList ticketsMap={archivesRegistry} />
        </div>
    )
}

export default ArchivesDashboard
