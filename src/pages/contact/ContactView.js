import React, { Component } from "react";
import { Header, Segment, Table, Button, Checkbox, Loader, Message } from "semantic-ui-react";
import moment from "moment";
import DeleteButton from "../../components/DeleteButton";
//import CustomerModal from "../modal/CustomerModal";
import MobxObserver from "../../components/MobxObserver";
import { inject } from "mobx-react";

const Toggle = ({ onToggle, checked }) => (
  <React.Fragment>
    <Checkbox toggle fitted onChange={onToggle} checked={checked} />
  </React.Fragment>
);

const TableRow = ({ name, value }) => (
  <Table.Row>
    <Table.Cell collapsing>{name}</Table.Cell>
    <Table.Cell>: {value ? value : "n/a"}</Table.Cell>
  </Table.Row>
);

class TableData extends MobxObserver {
  render() {
    const { item, onToggle } = this.props;
    let lat = "";
    let lng = "";
    if (item.storeLocation && item.storeLocation.coordinates) {
      lat = item.storeLocation.coordinates[1];
      lng = item.storeLocation.coordinates[0];
    }

    return (
      <Table basic="very">
        <Table.Body>
          <TableRow name="Nomor Telepon" value={item.phoneNumber} />
          <TableRow name="Jenis kelamin" value={item.gender} />
          <TableRow name="Agama" value={item.religion} />
          <TableRow name="Tahun Kelahiran" value={item.birthYear} />
          <TableRow name="Nama Toko" value={item.storeName} />
          <TableRow name="Alamat Toko" value={item.storeAddress} />
          <TableRow name="Kota" value={item.storeCity} />
          <Table.Row>
            <Table.Cell collapsing>Koordinate (Lat, Long)</Table.Cell>
            <Table.Cell>
              :{" "}
              <a
                href={`https://www.google.com/maps/?q=${lat},${lng}`}
                target="_blank"
              >{`${lat},${lng}`}</a>
            </Table.Cell>
          </Table.Row>
          <TableRow
            name="Tanggal Dibuat"
            value={item.createdAt ? moment(item.createdAt).format("D/MMM/YYYY HH:mm") : "n/a"}
          />
          <TableRow
            name="Tanggal Diperbaharui"
            value={item.updatedAt ? moment(item.updatedAt).format("D/MMM/YYYY HH:mm") : "n/a"}
          />
          <Table.Row>
            <Table.Cell collapsing>Aktif</Table.Cell>
            <Table.Cell>
              <Toggle onToggle={onToggle} checked={item.isActive} />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }
}

class ContactView extends MobxObserver {
  state = {
    modalOpen: false,
    loading: false,
    error: false
  };

  handleDelete = item => this.delete(item.id);

  delete(id) {
    this.setState({ loading: true, error: null });
    this.props.stores.customer
      .delete(id)
      .then(() => this.props.stores.ui.setSelectedCustomer(null))
      .catch(err => this.setState({ error: err }))
      .finally(() => this.setState({ loading: false }));
  }

  showUpdateModal = () => this.setState({ modalOpen: true });

  handleModalClose = () => this.setState({ modalOpen: false });

  handleToggleActive = (e, data) => {
    if (data.checked === true) this.props.stores.customer.enable(this.props.item);
    else this.props.stores.customer.disable(this.props.item);
  };

  handleEdit(item) {}

  handleDelete(item) {}

  render() {
    const { item } = this.props;
    if (!item) return null;

    return (
      <React.Fragment>
        <Header as="h3" attached="top">
          {item.fullName}
        </Header>
        <Segment attached>
          <TableData item={item} onToggle={this.handleToggleActive} />
        </Segment>
        <Segment attached="bottom" textAlign="right">
          {this.state.error ? <Message negative header="Error" content={this.state.error} /> : null}
          <Button.Group basic>
            <Button icon="pencil" content="Edit" compact onClick={() => this.handleEdit(item)} />
            <Button icon="trash" content="Delete" compact onClick={() => this.handleDelete(item)} />
          </Button.Group>
        </Segment>
      </React.Fragment>
    );
  }
}

export default inject("stores")(ContactView);
