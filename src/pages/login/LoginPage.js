import React, { Component } from "react";
import { Form, Button, Container, Grid, Message, Icon } from "semantic-ui-react";
import { Redirect, Link } from "react-router-dom";
import MobxObserver from "../../components/MobxObserver";
import { inject } from "mobx-react";
import CenteredSegment from "../../components/CenteredSegment";

class LoginPage extends MobxObserver {
  state = {
    loading: false,
    error: null
  };

  onFormSubmit = event => {
    event.preventDefault();

    const username = this.refs.username.value;
    const password = this.refs.password.value;
    this.login(username, password);
  };

  login(username, password) {
    this.setState({ loading: true, error: null });
    this.props.stores.auth
      .login(username, password)
      .catch(err => {
        this.setState({ error: err });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  render() {
    if (this.props.stores.auth.isLoggedIn()) return <Redirect to="/home" />;

    const errorMessage = this.state.error ? (
      <Message color="red">
        <Icon name="warning" />Login Failed
      </Message>
    ) : null;

    return (
      <CenteredSegment title="LOGIN">
        <Form onSubmit={this.onFormSubmit}>
          <Form.Field>
            <label>Username</label>
            <input type="text" name="username" ref="username" required />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input type="password" name="password" ref="password" required />
          </Form.Field>
          {errorMessage}
          <Grid columns="equal">
            <Grid.Column>
              <Button type="submit" color="blue" loading={this.state.loading}>
                Login
              </Button>
            </Grid.Column>
          </Grid>
        </Form>
      </CenteredSegment>
    );
  }
}

export default inject("stores")(LoginPage);
