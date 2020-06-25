import React from 'react'
import TicketItem from './TicketItem/TicketItem'
import { ITicket } from '../../../../Models/ticket'
import './ticketList.css';

const TicketList = () => {

    const tickets: ITicket[] = [
        {
            author: "Pablo",
            id: 265,
            status: "Pending",
            product: "AppleWorks 6",
            title: "Document does not save",
            date: "22/02/2020"
        },
        {
            author: "Bujigen",
            id: 303,
            status: "Urgent",
            product: "macOS Leopard",
            title: "Crash on startup at Night",
            date: "22/02/2020"
        },
        {
            author: "Sam",
            id: 621,
            status: "Done",
            product: "AppleWorks 6",
            title: "Require Refund",
            date: "22/02/2020"
        },
        {
            author: "Pablo",
            id: 905,
            status: "Pending",
            product: "AppleWorks 6.5",
            title: "Update not instaling",
            date: "22/02/2020"
        }
    ];

    return (
        <div id="ticketList">
            {tickets.map((ticket) => {
                return <TicketItem key={ticket.id} ticket={ticket}/>
            })}
        </div>
    )
}

export default TicketList
