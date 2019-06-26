import React, { Component } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import getBasicStyles from "ReactNativeNotas/src/styles/basicStyles";
import withColors from "ReactNativeNotas/src/styles/withColors";
import { FAB } from "ReactNativeNotas/src/components/";
import NoteGridItem from "./NoteGridItem";
import DrawerHeaderButton from "ReactNativeNotas/src/navigation/DrawerHeaderButton";
import {
	watchNotes,
	unsubscribeNotes
} from "ReactNativeNotas/src/redux/reducers/notesReducer";
import {
	watchCategories,
	unsubscribeCategories
} from "ReactNativeNotas/src/redux/reducers/categoriesReducer";
import {
	onNotification,
	onNotificationOpened,
	onInitialNotification
} from "ReactNativeNotas/src/utils/Notifications";

const styles = StyleSheet.create({
	list: {
		width: "100%"
	}
});

getDate = dateObj => (dateObj instanceof Date ? dateObj : dateObj.toDate());

class NotesScreen extends Component {
	componentDidMount = () => {
		this.props.watchNotes();
		this.props.watchCategories();

		this.removeNotificationListener = onNotification(notification => {
			this.onNotificationTap(notification);
		});

		this.removeNotificationOpenListener = onNotificationOpened(
			({ notification }) => {
				this.onNotificationTap(notification);
			}
		);

		this.removeOnInitialNotificationListener = onInitialNotification(
			({ notification }) => {
				this.onNotificationTap(notification);
			}
		);
	};

	onNotificationTap = notification => {
		console.log("test:notification", notification);
		const { notes } = this.props;
		const note = notes.find(n => n.id == notification.data.id);
		this.openNote(note);
	};

	componentWillUnmount = () => {
		unsubscribeCategories();
		unsubscribeNotes();
		this.removeNotificationListener();
		this.removeNotificationOpenListener();
		this.removeOnInitialNotificationListener();
	};

	openNote = note => {
		this.props.navigation.navigate("Note", {
			note: note,
			title: note ? "Editar Nota" : "Nueva Nota"
		});
	};

	render() {
		const { notes, colors } = this.props;
		const basicStyles = getBasicStyles(colors);
		return (
			<View style={basicStyles.container}>
				<FlatList
					style={styles.list}
					data={notes}
					keyExtractor={item => item.id}
					numColumns={2}
					renderItem={({ item }) => (
						<NoteGridItem note={item} onPress={this.openNote} />
					)}
				/>
				<FAB accent text="+" onPress={() => this.openNote(null)} />
			</View>
		);
	}
}

const mapStateToProps = state => {
	return {
		notes: state.notes
	};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{
			watchNotes,
			watchCategories
		},
		dispatch
	);
};

const NotesScreenHOC = connect(
	mapStateToProps,
	mapDispatchToProps
)(withColors(NotesScreen));

NotesScreenHOC.navigationOptions = ({ navigation }) => ({
	title: "Notas",
	headerLeft: <DrawerHeaderButton navigation={navigation} />
});

export default NotesScreenHOC;
