import React, { Component } from "react";
import { inject } from "mobx-react";
import {
  Header,
  Message,
  Loader,
  Table,
  Icon,
  Grid,
  Menu,
  Form,
  Input,
  Button,
  Dimmer,
  Segment
} from "semantic-ui-react";
import MobxObserver from "../../components/MobxObserver";
import ContactView from "./ContactView";
import { withRouter } from "react-router-dom";

class TableRow extends MobxObserver {
  render() {
    const { item, onView, onEdit, onToggle, onDelete } = this.props;
    return (
      <Table.Row key={item.id} negative={item.isActive ? false : true}>
        <Table.Cell>{item.fullName}</Table.Cell>
        <Table.Cell>{item.storeName}</Table.Cell>
        <Table.Cell>{item.storeCity}</Table.Cell>
        <Table.Cell collapsing>
          <Button.Group basic>
            <Button icon="eye" title="View" compact onClick={() => onView(item)} />
            <Button
              icon={item.isActive ? "toggle on" : "toggle off"}
              title={item.isActive ? "Click to disable" : "Click to enable"}
              compact
              onClick={() => onToggle(item)}
            />
            <Button icon="pencil" title="Edit" compact onClick={() => onEdit(item)} />
            <Button icon="trash" title="Delete" compact onClick={() => onDelete(item)} />
          </Button.Group>
        </Table.Cell>
      </Table.Row>
    );
  }
}

const TableRowNotFound = () => (
  <Table.Row textAlign="center">
    <Table.Cell colSpan="4">
      <React.Fragment>
        <Icon name="search" size="big" color="grey" />
        <p style={{ marginTop: 10 }}>Data Not Found</p>
      </React.Fragment>
    </Table.Cell>
  </Table.Row>
);

class TableData extends MobxObserver {
  state = {
    prevDisabled: false,
    nextDisabled: false
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { items, currentPage } = nextProps;
    let prevDisabled = currentPage === 1;
    let nextDisabled = items.length < 10;

    return {
      prevDisabled: prevDisabled,
      nextDisabled: nextDisabled
    };
  }

  render() {
    const { loading, items, onView, onToggle, onEdit, onDelete, onPrev, onNext } = this.props;
    return (
      <Dimmer.Dimmable>
        <Dimmer active={loading} inverted>
          <Loader inverted />
        </Dimmer>
        <Table compact unstackable selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Nama</Table.HeaderCell>
              <Table.HeaderCell>Toko</Table.HeaderCell>
              <Table.HeaderCell>Kota</Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {items.length === 0 ? (
              <TableRowNotFound />
            ) : (
              items.map(item => (
                <TableRow
                  item={item}
                  key={item.id}
                  onView={onView}
                  onToggle={onToggle}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            )}
          </Table.Body>
        </Table>
        <Segment basic textAlign="center">
          <Button.Group>
            <Button icon="arrow left" disabled={this.state.prevDisabled} onClick={onPrev} />
            <Button icon="arrow right" disabled={this.state.nextDisabled} onClick={onNext} />
          </Button.Group>
        </Segment>
      </Dimmer.Dimmable>
    );
  }
}

class ContactTable extends MobxObserver {
  state = {
    searchQuery: "",
    loading: false,
    error: null
  };

  componentDidMount() {
    if (this.props.stores.contact.items.length === 0) this.fetchContacts();
  }

  handleCreate = () => {
    this.props.history.push("/contacts/create");
  };

  handleView = item => {
    this.props.history.push({
      pathname: "/contacts/view/" + item.id,
      contact: item
    });
  };

  handleToggle = item => {
    this.setState({ loading: true, error: null });
    let result = item.isActive
      ? this.props.stores.contact.disable(item)
      : this.props.stores.contact.enable(item);
    result
      .catch(err => this.setState({ error: err }))
      .finally(() => this.setState({ loading: false }));
  };

  handleEdit = item => {
    this.props.history.push({
      pathname: "/contacts/edit/" + item.id,
      contact: item
    });
  };

  handleDelete = item => {
    if (window.confirm("Confirm deletion ?")) {
      this.setState({ loading: true, error: null });
      this.props.stores.contact
        .delete(item.id)
        .then(() => {})
        .catch(err => this.setState({ error: err }))
        .finally(() => this.setState({ loading: false }));
    }
  };

  handleSearch = e => {
    e.preventDefault();
    this.props.stores.contact.resetPage();
    this.searchContacts(this.state.searchQuery);
  };

  handlePrevious = () => {
    this.props.stores.contact.prevPage();
    this.fetchContacts();
  };

  handleNext = () => {
    this.props.stores.contact.nextPage();
    this.fetchContacts();
  };

  handleReset = () => {
    this.setState({ searchQuery: "" });
    this.props.stores.contact.resetPage();
    this.fetchContacts();
  };

  fetchContacts() {
    this.setState({ loading: true, error: null });
    this.props.stores.contact
      .fetchItems()
      .catch(err => this.setState({ error: err }))
      .finally(() => this.setState({ loading: false }));
  }

  searchContacts(query) {
    this.setState({ loading: true, error: null });
    this.props.stores.contact
      .searchItems(query)
      .catch(err => this.setState({ error: err }))
      .finally(() => this.setState({ loading: false }));
  }

  render() {
    let content = null;

    if (this.state.error) content = <Message negative header="Error" content={this.state.error} />;
    else
      content = (
        <TableData
          currentPage={this.props.stores.contact.currentPage}
          items={this.props.stores.contact.items}
          loading={this.state.loading}
          onView={this.handleView}
          onToggle={this.handleToggle}
          onEdit={this.handleEdit}
          onDelete={this.handleDelete}
          onPrev={this.handlePrevious}
          onNext={this.handleNext}
        />
      );

    return (
      <React.Fragment>
        <Menu secondary>
          <Menu.Item fitted>
            <Form onSubmit={this.handleSearch}>
              <Input
                icon="search"
                iconPosition="left"
                placeholder="Search ..."
                value={this.state.searchQuery}
                onChange={e => this.setState({ searchQuery: e.target.value })}
              />
            </Form>
          </Menu.Item>
          <Menu.Item fitted>
            <Button
              content="Create"
              icon="plus"
              labelPosition="left"
              color="green"
              onClick={() => this.handleCreate()}
            />
          </Menu.Item>
          <Menu.Item fitted>
            <Button
              basic
              content="Reset"
              icon="refresh"
              labelPosition="left"
              onClick={() => this.handleReset()}
            />
          </Menu.Item>
        </Menu>
        {content}
      </React.Fragment>
    );
  }
}

export default inject("stores")(withRouter(ContactTable));
