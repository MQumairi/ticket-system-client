import React from 'react'
import "./errorNotice.css";

interface IProps {
  //List props here in the form:
  //propName: propType;
  message: string;
}

// Don't forget to change component signature:
// const ActivityDashboard: React.FC<IProps> = ({
  //List props here (seperated by ",")
// }) => {

const ErrorNotice:React.FC<IProps> = (props) => {
    return (
        <div className="errorNotice">
            {props.message}
        </div>
    )
}

export default ErrorNotice
