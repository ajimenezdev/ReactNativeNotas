import React, { Component } from "react";
import { View } from "react-native";
import getBasicStyles from "ReactNativeNotas/src/styles/basicStyles";
import withColors from "ReactNativeNotas/src/styles/withColors";
import { Text } from "ReactNativeNotas/src/components";

class SettingsScreen3 extends Component {
	render() {
		const basicStyles = getBasicStyles(this.props.colors);
		return (
			<View style={basicStyles.container}>
				<Text> Ajustes 3 </Text>
			</View>
		);
	}
}

export default withColors(SettingsScreen3);
