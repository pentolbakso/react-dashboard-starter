import React, { Component } from "react";
import FullScreenLoader from "../components/FullScreenLoader";
import { Redirect } from "react-router-dom";
import MobxObserver from "../components/MobxObserver";
import { inject } from "mobx-react";

class LogoutPage extends MobxObserver {
  componentDidMount() {
    this.props.stores.auth.logout();
  }

  render() {
    if (this.props.stores.auth.getCurrentAdmin())
      return <FullScreenLoader title="Logout" message="Cleaning up..." />;

    return <Redirect exact to="/login" />;
  }
}

export default inject("stores")(LogoutPage);
