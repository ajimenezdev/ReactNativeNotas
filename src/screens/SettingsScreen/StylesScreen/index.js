import React, { Component } from "react";
import { View, ScrollView, StyleSheet, Switch } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import getBasicStyles from "ReactNativeNotas/src/styles/basicStyles";
import { Text, HR } from "ReactNativeNotas/src/components";
import withColors from "ReactNativeNotas/src/styles/withColors";
import { toggleDarkMode } from "ReactNativeNotas/src/redux/reducers/settingsReducer";

const styles = StyleSheet.create({
	list: {
		width: "100%"
	},
	listItem: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingLeft: 10,
		paddingRight: 10,
		height: 60
	}
});

class StylesSettings extends Component {
	render() {
		const { toggleDarkMode, styleSettings, colors } = this.props;
		const basicStyles = getBasicStyles(colors);
		return (
			<View style={basicStyles.container}>
				<ScrollView style={styles.list}>
					<View style={styles.listItem}>
						<Text>Modo Claro/Oscuro</Text>
						<Switch
							onValueChange={toggleDarkMode}
							value={styleSettings.darkMode}
							thumbColor={colors.accent}
						/>
					</View>
					<HR />
				</ScrollView>
			</View>
		);
	}
}

const mapStateToProps = state => {
	return {
		styleSettings: state.settings.styles
	};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{
			toggleDarkMode
		},
		dispatch
	);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withColors(StylesSettings));
