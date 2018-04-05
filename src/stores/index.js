import AuthStore from "./AuthStore";
import UiStore from "./UiStore";

const authStore = new AuthStore();
const uiStore = new UiStore();

const stores = {
  auth: authStore,
  ui: uiStore
};

export default stores;
