import uuid from "uuid/v1";
import firebase from "react-native-firebase";
const ADD_NOTE = "notes/ADD_NOTE";
const REMOVE_NOTE = "notes/REMOVE_NOTE";
const UPDATE_NOTE = "notes/UPDATE_NOTE";

const defaultState = [];

export default function reducer(state = defaultState, action) {
	switch (action.type) {
		case ADD_NOTE:
			if (!state.some(n => n.id === action.note.id)) {
				return [...state, { ...action.note }];
			}
		case UPDATE_NOTE:
			const updateIndex = state.findIndex(note => note.id === action.note.id);
			const newState = Object.assign(state.slice(), {
				[updateIndex]: action.note
			});
			return newState;
		case REMOVE_NOTE:
			return state.filter(note => note.id !== action.noteId);
		default:
			return state;
	}
}

export const addNote = note => async dispatch => {
	const newNote = {
		...note,
		author_id: firebase.auth().currentUser.uid,
		created: new Date()
	};
	firebase
		.firestore()
		.collection("notes")
		.add(newNote);
};

export const updateNote = note => async dispatch => {
	firebase
		.firestore()
		.collection("notes")
		.doc(note.id)
		.update(note);
};

export const removeNote = noteId => async dispatch => {
	firebase
		.firestore()
		.collection("notes")
		.doc(noteId)
		.delete();
};

let unsubscribe = null;

export const watchNotes = () => async dispatch => {
	const userId = firebase.auth().currentUser.uid;
	unsubscribe = firebase
		.firestore()
		.collection("notes")
		.where("author_id", "==", userId)
		.onSnapshot(querySnapshot => {
			querySnapshot.docChanges.forEach(docChange => {
				const doc = docChange.doc;
				switch (docChange.type) {
					case "added":
						dispatch({
							type: ADD_NOTE,
							note: {
								id: doc.id,
								...doc.data()
							}
						});
						break;
					case "modified":
						dispatch({
							type: UPDATE_NOTE,
							note: {
								id: doc.id,
								...doc.data()
							}
						});
						break;
					case "removed":
						dispatch({
							type: REMOVE_NOTE,
							noteId: doc.id
						});
				}
			});
		});
};

export const unsubscribeNotes = () => {
	unsubscribe && unsubscribe();
};
