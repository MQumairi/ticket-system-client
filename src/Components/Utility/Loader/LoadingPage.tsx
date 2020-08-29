import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

interface IProps {
  loadingText: string;
}

const LoadingPage: React.FC<IProps> = ({ loadingText }) => {
  return (
    <div>
      <Dimmer active>
        <Loader>{loadingText}</Loader>
      </Dimmer>
    </div>
  );
};

export default LoadingPage;
