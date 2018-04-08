import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Dimmer, Header, Icon, Grid, Menu, Segment, Divider } from "semantic-ui-react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { inject } from "mobx-react";
import Navbar from "../components/Navbar";
import MobxObserver from "../components/MobxObserver";
import FullScreenLoader from "../components/FullScreenLoader";
import HomePage from "./home/HomePage";
import Contacts from "./contact";
import AccountPage from "./account/AccountPage";
import NotFoundPage from "./NotFoundPage";
import Sidebar from "../components/Sidebar";

const menus = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: "home"
  },
  {
    title: "Contacts",
    path: "/contacts",
    icon: "user"
  },
  {
    title: "Servers",
    path: "/servers",
    icon: "laptop"
  },
  {
    title: "Stuffs",
    path: "/stuffs",
    icon: "lab"
  }
];

const mql = window.matchMedia(`(min-width: 640px)`);

class SecureApp extends MobxObserver {
  state = {
    loading: false,
    error: null,
    mql: mql,
    largeScreen: false
  };

  //recheck auth if user reload the page
  componentWillMount() {
    if (!this.props.stores.auth.isLoggedIn()) {
      this.setState({ loading: true, error: null });
      this.props.stores.auth
        .getProfile()
        .catch(err => {
          this.setState({ error: err });
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    }

    mql.addListener(this.mediaQueryChanged);
    this.setState({ mql: mql, largeScreen: mql.matches });
  }

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }

  mediaQueryChanged = () => this.setState({ largeScreen: this.state.mql.matches });

  render() {
    if (this.state.loading) return <FullScreenLoader title="Loading" message="Please wait..." />;
    else if (this.state.error) return <Redirect to="/login" />;

    return (
      <React.Fragment>
        <Grid>
          <Grid.Column computer={3} mobile={3} color="black" style={{ paddingRight: 0 }}>
            <Sidebar menus={menus} largeScreen={this.state.largeScreen} />
          </Grid.Column>
          <Grid.Column
            computer={13}
            mobile={13}
            style={{ paddingLeft: 0, backgroundColor: "#eeeeee" }}
          >
            <Grid.Row>
              <Navbar onNavClick={this.onToggleSidebar} largeScreen={this.state.largeScreen} />
            </Grid.Row>
            <Grid.Row style={{ padding: "1em" }}>
              <Switch>
                <Route path="/dashboard" component={HomePage} />
                <Route path="/contacts/:type?/:id?" component={Contacts} />
                <Route path="/account" component={AccountPage} />
                <Route component={NotFoundPage} />
              </Switch>
            </Grid.Row>
          </Grid.Column>
        </Grid>
      </React.Fragment>
    );
  }
}

export default inject("stores")(SecureApp);
