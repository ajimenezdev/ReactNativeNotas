import { combineReducers } from "redux";
import notesReducer from "./notesReducer";
import categoriesReducer from "./categoriesReducer";
import settingsReducer from "./settingsReducer";

const combinedReducers = combineReducers({
	notes: notesReducer,
	categories: categoriesReducer,
	settings: settingsReducer
});

const rootReducer = (state, action) => {
	if (action.type === "LOGOUT") {
		return combinedReducers(undefined, action);
	}

	return combinedReducers(state, action);
};

export default rootReducer;

export function logout() {
	return {
		type: "LOGOUT"
	};
}
