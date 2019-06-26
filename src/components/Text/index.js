import React from "react";
import { Text, StyleSheet } from "react-native";
import withColors from "ReactNativeNotas/src/styles/withColors";

const CustomText = ({ children, style, colors, ...props }) => (
	<Text style={[{ color: colors.text }, style]} {...props}>
		{children}
	</Text>
);

export default withColors(CustomText);
