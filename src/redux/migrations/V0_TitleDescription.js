const migrate = state => ({
	...state,
	notes: state.notes.map(note => ({
		...note,
		description: note.text,
		text: undefined
	}))
});

export default migrate;
