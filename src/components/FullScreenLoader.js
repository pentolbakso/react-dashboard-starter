import React, { Component } from "react";
import { Dimmer, Header, Icon } from "semantic-ui-react";

export default class FullScreenLoader extends Component {
  render() {
    const { title, message } = this.props;

    return (
      <Dimmer active page>
        <Header as="h3" icon inverted>
          <Icon loading name="spinner" />
          {title}
          <Header.Subheader>{message}</Header.Subheader>
        </Header>
      </Dimmer>
    );
  }
}
