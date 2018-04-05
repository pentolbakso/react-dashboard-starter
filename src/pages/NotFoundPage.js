import React, { Component } from "react";
import { Message, Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";

class NotFound extends Component {
  render() {
    return (
      <Grid verticalAlign="middle" centered style={{ marginTop: "8em" }}>
        <Grid.Column width={6}>
          <Message
            header="404 - Not Found"
            content="The page you are looking for was moved, removed, renamed or might never existed."
          />
          <Link to="/home">Back To Home</Link>
        </Grid.Column>
      </Grid>
    );
  }
}

export default NotFound;
