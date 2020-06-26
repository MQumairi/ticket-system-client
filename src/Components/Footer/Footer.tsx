import React from "react";
import "./footer.css";
import { Grid } from "semantic-ui-react";

const Footer = () => {
  return (
    <div id="footerBar">
      <div id="footerContent">
        <Grid columns={3} stackable>
          <Grid.Column width={6}>
            <div id="footerAbout">
              <h2>About</h2>
              <p>
                This is a ticket sysyem designed by Mohammed Alqumairi using a
                custom made .NET core API for the backend, and React.js for the
                front end.
              </p>
              <p>
                In the backend, EntityFrameworkCore was used to map C# objects
                to the PostGreSQL database. ASP .NET Core Identity was used for
                authentication and authorization. In the front end, Axios was
                used to fetch from the API, and MobX for state management.
              </p>
            </div>
          </Grid.Column>
          <Grid.Column id="footerGap" />
          <Grid.Column width={4}>
            <h2>Contact</h2>
            <Grid columns={3} stackable id="contactDetails">
              <Grid.Column>
                <div className="contactCircle"><div className="contactPic contactEmail"></div></div>
                Email
              </Grid.Column>
              <Grid.Column>
                <div className="contactCircle"><div className="contactPic contactPortfolio"></div></div>
                Portfolio
              </Grid.Column>
              <Grid.Column>
                <div className="contactCircle"><div className="contactPic contactGithub"></div></div>
                GitHub
              </Grid.Column>
            </Grid>
          </Grid.Column>
        </Grid>
      </div>
    </div>
  );
};

export default Footer;
