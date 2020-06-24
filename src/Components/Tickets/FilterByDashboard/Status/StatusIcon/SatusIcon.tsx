import React from "react";
import "./statusIcon.css";

interface IProps {
  content: string;
}

const SatusIcon: React.FC<IProps> = ({ content }) => {
//   const [statusColur, setStatusColur] = useState<string>("circle-red");

  const circleColor = () => {
    switch (content) {
      case "Urgent":
        return "circle-red";
      case "Low":
        return "circle-orange";
      case "Pending":
        return "circle-yellow";
      case "Done":
        return "circle-green";
      default:
        return "circle-red";
    }
  };

  return (
    <div className="statusIcon">
      <div className={circleColor()}></div>
      <div className="statusContent">{content}</div>
    </div>
  );
};

export default SatusIcon;
