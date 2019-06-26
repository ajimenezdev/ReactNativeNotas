import React, { Component } from "react";
import {
	View,
	TouchableOpacity,
	StyleSheet,
	Animated,
	Easing
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import getBasicStyles from "ReactNativeNotas/src/styles/basicStyles";
import withColors from "ReactNativeNotas/src/styles/withColors";
import { Text } from "ReactNativeNotas/src/components";
import {
	Menu,
	MenuOptions,
	MenuOption,
	MenuTrigger
} from "react-native-popup-menu";
import { removeNote } from "ReactNativeNotas/src/redux/reducers/notesReducer";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: 130
	},
	title: {
		fontWeight: "bold"
	},
	text: {}
});

class NoteGridItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isMenuOpen: false,
			scaleAnim: new Animated.Value(1)
		};
	}

	editFromMenu = note => {
		this.setState({ isMenuOpen: false });
		this.props.onPress(note);
	};

	deleteFromMenu = note => {
		this.setState({ isMenuOpen: false });
		Animated.timing(this.state.scaleAnim, {
			toValue: 0,
			duration: 500,
			easing: Easing.inOut(Easing.cubic),
			useNativeDriver: true
		}).start(() => this.props.removeNote(note.id));
	};

	render() {
		const { note, onPress, categories, colors } = this.props;
		const basicStyles = getBasicStyles(colors);
		const { title, description, categoryId } = note;
		const { isMenuOpen, scaleAnim } = this.state;
		const category = categories.find(c => c.id === categoryId);
		return (
			<Animated.View
				style={[
					styles.container,
					{
						transform: [{ scale: scaleAnim }]
					}
				]}
			>
				<TouchableOpacity
					style={[
						basicStyles.paper,
						styles.container,
						{
							backgroundColor: (category && category.color) || colors.background
						}
					]}
					onPress={() => onPress(note)}
					onLongPress={() => this.setState({ isMenuOpen: true })}
				>
					<Menu opened={isMenuOpen}>
						<MenuTrigger />
						<MenuOptions opened={isMenuOpen}>
							<MenuOption
								triggerOnLongPress
								onSelect={() => this.editFromMenu(note)}
								text={"Editar"}
							/>
							<View style={styles.divider} />
							<MenuOption
								onSelect={() => this.deleteFromMenu(note)}
								text="Borrar"
							/>
						</MenuOptions>
					</Menu>
					<Text style={styles.title}>{title}</Text>
					<Text style={styles.text} numberOfLines={5}>
						{description}
					</Text>
				</TouchableOpacity>
			</Animated.View>
		);
	}
}

const mapStateToProps = state => {
	return {
		categories: state.categories
	};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{
			removeNote
		},
		dispatch
	);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withColors(NoteGridItem));
