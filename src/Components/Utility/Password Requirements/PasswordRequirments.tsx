import React from 'react';
import "./passwordRequirements.css";

const PasswordRequirments = () => {
    return (
        <div className="passwordRequirments">
            Your password must be 8 or more characters in length, and must include:
            <ul>
            <li>A lower case letter</li>
            <li>An upper case letter</li>
            <li>A number</li>
            <li>A special character (e.g. !@#$...etc.)</li>
            </ul>
        </div>
    )
}

export default PasswordRequirments
