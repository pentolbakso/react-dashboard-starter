import React, { Component } from "react";
import { Breadcrumb, Divider, Message } from "semantic-ui-react";
import ContactTable from "./ContactTable";
import ContactView from "./ContactView";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { type, id } = this.props.match.params;
    const { contact } = this.props.location;

    let childBreadcrumb = null;
    let content = null;
    if (type) {
      if (type === "create") {
        childBreadcrumb = <Breadcrumb.Section>Create</Breadcrumb.Section>;
      } else if (type === "view") {
        content = <ContactView item={contact} />;
        childBreadcrumb = (
          <Breadcrumb.Section>{contact ? contact.fullName : "View"}</Breadcrumb.Section>
        );
      } else if (type === "edit") {
        childBreadcrumb = (
          <Breadcrumb.Section>{contact ? contact.fullName : "Edit"}</Breadcrumb.Section>
        );
      } else {
        content = <Message negative header="Not Found" content="Please check your URL" />;
      }
    } else content = <ContactTable />;

    return (
      <React.Fragment>
        <Breadcrumb size="big">
          <Breadcrumb.Section link>Contacts</Breadcrumb.Section>
          {childBreadcrumb ? <Breadcrumb.Divider icon="right chevron" /> : null}
          {childBreadcrumb}
        </Breadcrumb>
        <Divider />
        {content}
        {/*<pre>{JSON.stringify(this.props, null, 4)}</pre>*/}
      </React.Fragment>
    );
  }
}

export default Contact;
