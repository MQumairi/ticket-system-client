import React from 'react'
import "./errorPage.css";
import ErrorNotice from '../Utility/Error Notice/ErrorNotice';


const Error403 = () => {
    return (
        <div className="errorPageBody">
            <h2>Forbidden</h2>
            <ErrorNotice message="Error 403. You do not have permission to access this page."/>
        </div>
    )
}

export default Error403
