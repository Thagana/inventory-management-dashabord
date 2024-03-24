import { Action, createStore, action } from "easy-peasy";

export interface StoreModel {
  navigation: string;
  updateNavigation: Action<StoreModel, string>;
}

const store = createStore<StoreModel>({
  navigation: "1",
  updateNavigation: action((state, payload) => {
    state.navigation = payload;
  }),
});

export default store;
