import React from 'react'
import "./filterDashboard.css"
import Status from "./Status/Status"
import Product from "./Product/Product"
import Dates from "./Dates/Dates"
import { Button } from 'semantic-ui-react'

const FilterByDashboard = () => {
    return (
        <div id="FilterDashboard">
            <h3>Filter By</h3>
            <hr/>
            <Status/>
            <hr/>
            <Product/>
            <hr/>
            <Dates/>
            <hr/>
            <Button className="mainButton">SELECT ALL</Button>
        </div>
    )
}

export default FilterByDashboard
