import React, { Component } from "react";
import { Segment, Form, Button, Message, Icon, Dimmer, Loader } from "semantic-ui-react";
import MobxObserver from "../../components/MobxObserver";
import { inject } from "mobx-react";
import { withRouter } from "react-router-dom";

class ContactEdit extends MobxObserver {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      phoneNumber: "",
      religion: "",
      gender: "",
      birthYear: "",
      storeName: "",
      storeAddress: "",
      storeCity: "",
      loading: false,
      error: null,
      dataNotFound: false
    };
  }

  handleInputChange = e => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = e => {
    const storeLocation = {
      types: "point",
      coordinates: [0, 0]
    };

    const request = {
      fullName: this.state.fullName,
      phoneNumber: this.state.phoneNumber,
      religion: this.state.religion,
      gender: this.state.gender,
      birthYear: this.state.birthYear,
      storeName: this.state.storeName,
      storeAddress: this.state.storeAddress,
      storeCity: this.state.storeCity,
      storeLocation: storeLocation
    };

    this.setState({ loading: true, error: null });
    if (this.props.create) {
      this.props.stores.contact
        .create(request)
        .then(() => {
          this.displayContacts();
        })
        .catch(err => this.setState({ error: err }))
        .finally(() => this.setState({ loading: false }));
    } else {
      this.props.stores.contact
        .update(this.props.item.id, request)
        .then(() => {
          this.displayContacts();
        })
        .catch(err => this.setState({ error: err }))
        .finally(() => this.setState({ loading: false }));
    }
  };

  displayContacts() {
    this.props.history.replace("/contacts");
  }

  setItem(item) {
    this.setState({
      fullName: item ? item.fullName : "",
      phoneNumber: item ? item.phoneNumber : "",
      religion: item ? item.religion : "",
      gender: item ? item.gender : "",
      birthYear: item ? item.birthYear : "",
      storeName: item ? item.storeName : "",
      storeAddress: item ? item.storeAddress : "",
      storeCity: item ? item.storeCity : ""
    });
  }

  componentWillMount() {
    this.setItem(this.props.item);
  }

  componentDidMount() {
    //refetch if we have no item
    if (this.props.id && !this.props.item) {
      this.setState({ loading: true, dataNotFound: false });
      this.props.stores.contact
        .fetchItem(this.props.id)
        .then(item => this.setItem(item))
        .catch(err => this.setState({ dataNotFound: true }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  render() {
    const { item, create } = this.props;

    if (this.state.dataNotFound) {
      return (
        <Message
          negative
          header="A little problem"
          content="We can't find the data or we have some problems with the connection"
        />
      );
    }

    let errorMessage = this.state.error ? (
      <Message negative header="Error" content={this.state.error.message} />
    ) : null;

    return (
      <Dimmer.Dimmable>
        <Dimmer active={this.state.loading} inverted>
          <Loader inverted />
        </Dimmer>
        <Form onSubmit={this.handleFormSubmit}>
          <Segment attached>
            <Form.Field>
              <label>Nama (*)</label>
              <input
                placeholder="nama lengkap"
                name="fullName"
                value={this.state.fullName}
                onChange={this.handleInputChange}
                required
              />
            </Form.Field>
            <Form.Field>
              <label>No. Telpon</label>
              <input
                placeholder="081xxxxx"
                name="phoneNumber"
                value={this.state.phoneNumber}
                onChange={this.handleInputChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Jenis Kelamin</label>
              <input
                placeholder="L atau P"
                name="gender"
                value={this.state.gender}
                onChange={this.handleInputChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Tahun Kelahiran</label>
              <input
                placeholder="misal: 1969"
                name="birthYear"
                value={this.state.birthYear}
                onChange={this.handleInputChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Agama</label>
              <input
                placeholder="islam, kristen, dll"
                name="religion"
                value={this.state.religion}
                onChange={this.handleInputChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Nama Toko (*)</label>
              <input
                placeholder="Warung Cecep"
                name="storeName"
                value={this.state.storeName}
                onChange={this.handleInputChange}
                required
              />
            </Form.Field>
            <Form.Field>
              <label>Alamat Toko (*)</label>
              <input
                placeholder="jalan, kecamatan"
                name="storeAddress"
                value={this.state.storeAddress}
                onChange={this.handleInputChange}
                required
              />
            </Form.Field>
            <Form.Field>
              <label>Kota (*)</label>
              <input
                placeholder="sukabumi, bogor"
                name="storeCity"
                value={this.state.storeCity}
                onChange={this.handleInputChange}
                required
              />
            </Form.Field>
            {errorMessage}
          </Segment>
          <Segment attached="bottom" textAlign="right">
            <Button type="submit" color="green" loading={this.state.loading}>
              <Icon name="checkmark" />
              {create ? "Create" : "Update"}
            </Button>
          </Segment>
        </Form>
      </Dimmer.Dimmable>
    );
  }
}

export default inject("stores")(withRouter(ContactEdit));
