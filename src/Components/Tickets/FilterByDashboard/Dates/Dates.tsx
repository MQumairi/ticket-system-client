import React from 'react'
import { Input } from 'semantic-ui-react'
import './dates.css'

const Dates = () => {
    return (
        <div className="filterDates">
            <h4 className="filterTitle">Dates</h4>
            <div className="dateSubheading">From</div>
            <Input type="date" placeholder='Search users...' />
            <div className="dateSubheading">To</div>
            <Input type="date" placeholder='Search users...' />
        </div>
    )
}

export default Dates
