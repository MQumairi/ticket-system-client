import React, { useContext } from 'react'
import { Input } from 'semantic-ui-react'
import TicketStore from '../../../App/Store/ticketStore'
import './dates.css'

const Dates = () => {
    
    const ticketStore = useContext(TicketStore);
    const { changeFromDate, changeToDate } = ticketStore; 

    return (
        <div className="filterDates">
            <h4 className="filterTitle">Dates</h4>
            <div className="dateSubheading">From</div>
            <Input onChange={(e) => {changeFromDate(e.target.value)}} type="date" placeholder='Search users...' />
            <div className="dateSubheading">To</div>
            <Input onChange={(e) => {changeToDate(e.target.value)}} type="date" placeholder='Search users...' />
        </div>
    )
}

export default Dates