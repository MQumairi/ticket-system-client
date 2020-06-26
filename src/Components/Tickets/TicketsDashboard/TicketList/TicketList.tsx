import React, { useContext } from 'react'
import TicketItem from './TicketItem/TicketItem'
import {observer } from 'mobx-react-lite'
import './ticketList.css';
import TicketStore from '../../../App/Store/ticketStore'

const TicketList = () => {

    const store = useContext(TicketStore);
    const {filteredTickets} = store;

    return (
        <div id="ticketList">
            {filteredTickets.map((ticket) => {
                return <TicketItem key={ticket.id} ticket={ticket}/>
            })}
        </div>
    )
}

export default observer(TicketList)
