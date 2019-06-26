import React from "react";
import { View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
	colorView: {
		width: 30,
		height: 30,
		borderRadius: 15,
		margin: 5,
		elevation: 4,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.8
	}
});

const colorView = ({ color, ...otherProps }) => (
	<View
		{...otherProps}
		style={[styles.colorView, color && { backgroundColor: color }]}
	/>
);

export default colorView;
