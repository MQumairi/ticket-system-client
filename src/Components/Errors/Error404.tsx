import React from 'react'
import "./errorPage.css";
import ErrorNotice from '../Utility/Error Notice/ErrorNotice';

const Error404 = () => {
    return (
        <div className="errorPageBody">
            <h2>Page not found.</h2>
            <ErrorNotice message="Error 404"/>
        </div>
    )
}

export default Error404
