import firebase from "react-native-firebase";
export const ADD_CATEGORY = "categories/ADD_CATEGORY";
export const REMOVE_CATEGORY = "categories/REMOVE_CATEGORY";
export const UPDATE_CATEGORY = "categories/UPDATE_CATEGORY";

const defaultState = [];

export default function reducer(state = defaultState, action) {
	switch (action.type) {
		case ADD_CATEGORY:
			// if the category is already on the state, treat it as an update. (Due to mix of redux-persist and firebase)
			if (!state.some(c => c.id == action.category.id)) {
				return [...state, action.category];
			}
		case UPDATE_CATEGORY:
			const updateIndex = state.findIndex(c => c.id === action.category.id);
			const newState = Object.assign(state.slice(), {
				[updateIndex]: action.category
			});
			return newState;
		case REMOVE_CATEGORY:
			return state.filter(category => category.id !== action.categoryId);
		default:
			return state;
	}
}

export const addCategory = category => async dispatch => {
	const newCategory = {
		...category,
		author_id: firebase.auth().currentUser.uid
	};
	firebase
		.firestore()
		.collection("categories")
		.add(newCategory);
};

export const updateCategory = nocategoryte => async dispatch => {
	firebase
		.firestore()
		.collection("categories")
		.doc(category.id)
		.update(category);
};

export const removeCategory = categoryId => async dispatch => {
	firebase
		.firestore()
		.collection("categories")
		.doc(categoryId)
		.delete();
};

let unsubscribe = [];

export const watchCategories = () => async dispatch => {
	const userId = firebase.auth().currentUser.uid;
	unsubscribe = firebase
		.firestore()
		.collection("categories")
		.where("author_id", "==", userId)
		.onSnapshot(querySnapshot => {
			querySnapshot.docChanges.forEach(docChange => {
				const doc = docChange.doc;
				switch (docChange.type) {
					case "added":
						dispatch({
							type: ADD_CATEGORY,
							category: {
								id: doc.id,
								...doc.data()
							}
						});
						break;
					case "modified":
						dispatch({
							type: UPDATE_CATEGORY,
							category: {
								id: doc.id,
								...doc.data()
							}
						});
						break;
					case "removed":
						dispatch({
							type: REMOVE_CATEGORY,
							categoryId: doc.id
						});
				}
			});
		});
};

export const unsubscribeCategories = () => {
	unsubscribe && unsubscribe();
};
