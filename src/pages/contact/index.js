import React, { Component } from "react";
import { Breadcrumb, Divider, Message } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import ContactTable from "./ContactTable";
import ContactView from "./ContactView";
import ContactEdit from "./ContactEdit";

class Contact extends Component {
  handleClick = (e, data) => {
    this.props.history.push("/contacts");
  };

  render() {
    const { type, id } = this.props.match.params;
    const { contact } = this.props.location;

    let childBreadcrumb = null;
    let content = null;
    if (type) {
      if (type === "create") {
        content = <ContactEdit create />;
        childBreadcrumb = <Breadcrumb.Section>Create</Breadcrumb.Section>;
      } else if (type === "view") {
        content = <ContactView item={contact} id={id} />;
        childBreadcrumb = (
          <Breadcrumb.Section>{contact ? contact.fullName : "View"}</Breadcrumb.Section>
        );
      } else if (type === "edit") {
        content = <ContactEdit item={contact} id={id} />;
        childBreadcrumb = (
          <Breadcrumb.Section>{contact ? contact.fullName : "Edit"}</Breadcrumb.Section>
        );
      } else {
        content = <Message negative header="Not Found" content="Please check your URL" />;
      }
    } else content = <ContactTable />;

    return (
      <React.Fragment>
        <Breadcrumb size="huge">
          <Breadcrumb.Section onClick={!childBreadcrumb ? null : this.handleClick}>
            Contacts
          </Breadcrumb.Section>
          {childBreadcrumb ? <Breadcrumb.Divider icon="right chevron" /> : null}
          {childBreadcrumb}
        </Breadcrumb>
        <Divider hidden />
        {content}
        {/*<pre>{JSON.stringify(this.props, null, 4)}</pre>*/}
      </React.Fragment>
    );
  }
}

export default withRouter(Contact);
