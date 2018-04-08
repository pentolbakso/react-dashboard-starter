import AuthStore from "./AuthStore";
import UiStore from "./UiStore";
import ContactStore from "./ContactStore";

const authStore = new AuthStore();
const uiStore = new UiStore();
const contactStore = new ContactStore();

const stores = {
  auth: authStore,
  ui: uiStore,
  contact: contactStore
};

export default stores;
