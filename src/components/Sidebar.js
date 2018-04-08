import React, { Component, Fragment } from "react";
import { Container, Menu, Icon, List, Header, Divider } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";

const iconStyle = {
  float: "none",
  marginRight: "0.5em"
};

class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  handleClick(path) {
    this.props.history.push(path);
  }

  render() {
    const { menus, largeScreen } = this.props;
    const url = this.props.match.url;
    const current = "/" + this.props.match.url.split("/", 2)[1];

    let n = 0;
    return (
      <div style={{ height: "100vh" }}>
        <Container textAlign="center" style={{ paddingTop: "1em" }}>
          <Header as="h5" inverted icon color="blue">
            <Icon name="cube" />
            {largeScreen ? "Web App" : null}
          </Header>
        </Container>
        <Menu fluid inverted vertical icon={largeScreen ? null : true}>
          {menus.map(menu => (
            <Menu.Item
              onClick={() => this.handleClick(menu.path)}
              active={current === menu.path}
              key={n++}
            >
              <Icon name={menu.icon} style={iconStyle} size={largeScreen ? null : "big"} />
              {largeScreen ? menu.title : null}
            </Menu.Item>
          ))}
        </Menu>
        {/* 
        <List
          inverted
          divided
          relaxed="very"
          size="normal"
          selection
          verticalAlign="middle"
          style={{ height: "100vh", padding: largeScreen ? "1em" : "0.2em" }}
        >
          {menus.map(menu => {
            return (
              <List.Item as="a" onClick={() => this.handleClick(menu.path)} key={n++}>
                <List.Icon size="large" name={menu.icon} />
                {largeScreen ? <List.Content>{menu.title}</List.Content> : null}
              </List.Item>
            );
          })}
        </List>
        */}
      </div>
    );
  }
}

export default withRouter(Sidebar);
