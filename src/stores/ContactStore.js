import { extendObservable, flow } from "mobx";
import {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
  searchContact,
  enableContact,
  disableContact
} from "../services/deploydApi";
import { createError } from "../utils";

export default class ContactStore {
  constructor() {
    extendObservable(this, {
      items: []
    });
  }

  fetchItems = flow(function*() {
    try {
      const response = yield getContacts();
      this.items.replace(response.data);
    } catch (e) {
      throw createError(e);
    }
  });

  searchItems = flow(function*(query) {
    try {
      const response = yield searchContact(query);
      this.items.replace(response.data);
    } catch (e) {
      throw createError(e);
    }
  });

  create = flow(function*(sales) {
    try {
      const response = yield createContact(sales);
      this.items.push(response.data);
    } catch (e) {
      throw createError(e);
    }
  });

  update = flow(function*(id, sales) {
    try {
      const response = yield updateContact(id, sales);
      let item = this.items.find(item => item.id === id);
      item.fullName = response.data.fullName;
      item.phoneNumber = response.data.phoneNumber;
      item.religion = response.data.religion;
      item.gender = response.data.gender;
      item.birthYear = response.data.birthYear;
      item.storeName = response.data.storeName;
      item.storeAddress = response.data.storeAddress;
      item.storeCity = response.data.storeCity;
      item.storeLocation = response.data.storeLocation;
      item.updatedAt = response.data.updatedAt;
      item.isActive = response.data.isActive;
    } catch (e) {
      throw createError(e);
    }
  });

  delete = flow(function*(id) {
    try {
      const response = yield deleteContact(id);
      if (response.data.count && response.data.count > 0) {
        let item = this.items.find(item => item.id === id);
        this.items.remove(item);
        item = null;
      } else throw new Error("ID not found in database");
    } catch (e) {
      throw createError(e);
    }
  });

  enable = flow(function*(item) {
    try {
      const response = yield enableContact(item.id);
      item.isActive = true;
      item.updatedAt = response.data.updatedAt;
    } catch (e) {
      item.isActive = false;
      throw createError(e);
    }
  });

  disable = flow(function*(item) {
    try {
      const response = yield disableContact(item.id);
      item.isActive = false;
      item.updatedAt = response.data.updatedAt;
    } catch (e) {
      item.isActive = true;
      throw createError(e);
    }
  });
}
