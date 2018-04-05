import { action, extendObservable, computed } from "mobx";

export default class UiStore {
  constructor() {
    extendObservable(this, {
      largeScreen: false
    });
  }

  setLargeScreen = action(flag => {
    this.largeScreen = flag;
    console.log(this.largeScreen);
  });

  isLargeScreen() {
    return computed(() => {
      return this.largeScreen;
    }).get();
  }
}
