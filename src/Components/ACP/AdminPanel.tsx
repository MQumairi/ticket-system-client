import React from "react";
import ACPMobileMenu from "./ACPMenu/ACPMobileMenu";
import ACPMenu from "./ACPMenu/ACPMenu";
import "./adminPanel.css";
import { observer } from "mobx-react-lite";

interface IProps {
  currentPage: string;
}

const AdminPanel: React.FC<IProps> = (props: any) => {

  return (
    <div>
      <ACPMobileMenu currentPage={props.currentPage} />
      <div id="adminPanelBody">
        <h1>Admin Control Panel</h1>
        <hr />
        <div className="adminPanelContentContainer">
          <div className="adminPanelContent">{props.children}</div>
          <div className="adminPanelMenu">
            <ACPMenu currentPage={props.currentPage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(AdminPanel);
