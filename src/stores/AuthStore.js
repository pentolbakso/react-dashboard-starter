import { observable, runInAction, computed, extendObservable, flow } from "mobx";
import { login, logout, getProfile, updateProfile } from "../services/deploydApi";
import { createError } from "../utils";

const LOCAL_STORAGE_NAME = "mywebapp";

export default class AuthStore {
  sessionId = undefined;

  constructor() {
    this.sessionId = localStorage.getItem(LOCAL_STORAGE_NAME) || undefined;

    extendObservable(this, {
      tasks: observable.map(),
      currentAdmin: null
    });
  }

  login = flow(function*(username, password) {
    try {
      const response = yield login(username, password);
      const profileResp = yield getProfile();

      this.sessionId = response.data.id;
      localStorage.setItem(LOCAL_STORAGE_NAME, this.sessionId);
      this.currentAdmin = profileResp.data;
    } catch (e) {
      throw createError(e);
    }
  });

  logout = flow(function*() {
    try {
      yield logout();
    } finally {
      this.clearSession();
    }
  });

  clearSession = () => {
    localStorage.removeItem(LOCAL_STORAGE_NAME);
    this.sessionId = undefined;
    runInAction(() => {
      this.currentAdmin = null;
    });
  };

  getProfile = flow(function*() {
    try {
      const response = yield getProfile();
      if (response.status === 204) throw new Error("No Content");
      else this.currentAdmin = response.data;
    } catch (e) {
      this.clearSession();
      throw createError(e);
    }
  });

  updateProfile = flow(function*(item) {
    try {
      let id = this.currentAdmin.id;
      const response = yield updateProfile(id, item);
      this.currentAdmin = response.data;
    } catch (e) {
      throw createError(e);
    }
  });

  isLoggedIn() {
    return computed(() => {
      return this.sessionId && this.currentAdmin && this.currentAdmin.id;
    }).get();
  }

  getCurrentAdmin() {
    return computed(() => {
      return this.currentAdmin;
    }).get();
  }
}
