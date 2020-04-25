import { createStore } from "redux";
import reducer from "./reducers";
import { loadState, saveState } from "./localStorage";
import _ from "lodash";

const persistedState = loadState();

const configureStore = () => {
	const store = createStore(reducer, persistedState);

	store.subscribe(
		_.throttle(() => {
			saveState(store.getState());
		}, 1000)
	);
	return store;
};

export default configureStore;
