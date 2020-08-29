import React from "react";
import { Loader, Dimmer } from "semantic-ui-react";
import "./loadingComp.css";

interface IProps {
  loadingText: string;
}

const LoadingComp: React.FC<IProps> = ({ loadingText }) => {
  return (
    <div className="loaderContainer">
      <Loader className="loader" active>
        {loadingText}
      </Loader>
    </div>
  );
};

export default LoadingComp;
