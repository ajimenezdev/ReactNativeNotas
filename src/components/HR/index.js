import React from "react";
import { Text, View } from "react-native";
import withColors from "ReactNativeNotas/src/styles/withColors";

const HR = ({ size, color, colors }) => (
	<View
		style={{
			borderBottomColor: color || colors.secondary,
			borderBottomWidth: 1,
			margin: 10,
			width: size || "90%"
		}}
	/>
);

export default withColors(HR);
