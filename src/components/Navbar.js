import React, { Component } from "react";
import { Icon, Menu, Dropdown } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import MobxObserver from "./MobxObserver";
import { inject } from "mobx-react";

class Navbar extends MobxObserver {
  onMenuItemClick = (event, { name }) => {
    event.preventDefault();
    let path = "/" + name;
    this.props.history.push(path);
  };

  render() {
    const { largeScreen } = this.props;

    const activeMenuColor = "blue";
    let name = this.props.stores.auth.getCurrentAdmin()
      ? this.props.stores.auth.getCurrentAdmin().fullName
      : "Admin";
    const trigger = (
      <span>
        <Icon name="user" circular inverted color="orange" /> {largeScreen ? name : null}
      </span>
    );
    const path = this.props.location.pathname;

    return (
      <React.Fragment>
        <Menu style={{ border: "none", borderRadius: 0 }}>
          <Menu.Menu position="right">
            <Dropdown item trigger={trigger}>
              <Dropdown.Menu>
                <Dropdown.Item name="account" onClick={this.onMenuItemClick}>
                  Account
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item name="logout" onClick={this.onMenuItemClick}>
                  Log out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Menu>
      </React.Fragment>
    );
  }
}

export default inject("stores")(withRouter(Navbar));
