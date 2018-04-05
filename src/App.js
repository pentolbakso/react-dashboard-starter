import React, { Component } from "react";
import { Provider } from "mobx-react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import NotFoundPage from "./pages/NotFoundPage";
import Dashboard from "./pages/Dashboard";
import stores from "./stores";

class NeedAuthRoute extends Component {
  render() {
    if (stores.auth.sessionId)
      return <Route path={this.props.path} component={this.props.component} />;
    else
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: this.props.location, message: "Login Required!" }
          }}
        />
      );
  }
}

export default class App extends Component {
  render() {
    return (
      <Provider stores={stores}>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={LoginPage} />
            <Route path="/login" component={LoginPage} />
            <NeedAuthRoute path="/home" component={Dashboard} />
            <NeedAuthRoute path="/contacts" component={Dashboard} />
            <NeedAuthRoute path="/account" component={Dashboard} />
            <Route path="/logout" component={LogoutPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}
