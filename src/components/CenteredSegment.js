import React, { Component } from "react";
import { Segment, Grid, Header } from "semantic-ui-react";

class CenteredSegment extends Component {
  render() {
    const { title, children } = this.props;

    let header = "";
    if (title)
      header = (
        <Header as="h3" attached="top" textAlign="left">
          {title}
        </Header>
      );

    return (
      <Grid verticalAlign="middle" centered style={{ marginTop: "8em" }}>
        <Grid.Column width={6}>
          {header}
          <Segment attached>{children}</Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default CenteredSegment;
