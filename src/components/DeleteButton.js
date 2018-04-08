import React, { Component } from "react";
import { Button } from "semantic-ui-react";

export default class DeleteButton extends Component {
  render() {
    const { onDeleteConfirmed, loading } = this.props;

    return (
      <Button
        icon="trash"
        basic
        loading={loading}
        labelPosition="left"
        size="small"
        content="Delete"
        onClick={() => {
          if (window.confirm("Are you sure want to delete the record ?")) onDeleteConfirmed();
        }}
      />
    );
  }
}
