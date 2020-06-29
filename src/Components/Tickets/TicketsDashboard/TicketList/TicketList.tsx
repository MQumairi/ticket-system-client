import React, { useContext } from 'react'
import TicketItem from './TicketItem/TicketItem'
import {observer } from 'mobx-react-lite'
import './ticketList.css';
import FilterStore from '../../../App/Store/filterStore'

const TicketList = () => {

    const store = useContext(FilterStore);
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
