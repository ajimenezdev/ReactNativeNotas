import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import withColors from "ReactNativeNotas/src/styles/withColors";
import { Text } from "ReactNativeNotas/src/components";

const size = 50;
const getStyles = color =>
	StyleSheet.create({
		fabContainer: {
			height: size,
			width: size,
			borderRadius: size / 2,
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: "#0000ff",
			shadowOffset: { width: 1, height: 3 },
			shadowColor: "black",
			shadowOpacity: 0.5,
			shadowRadius: 3,
			elevation: 5,
			position: "absolute",
			bottom: 50,
			right: 20
		},
		fabText: {
			color: "#fff",
			fontWeight: "bold"
		}
	});

const FAB = props => {
	const {
		style,
		textStyle,
		text,
		children,
		primary,
		secondary,
		accent,
		colors,
		...otherProps
	} = props;
	const styles = getStyles(colors);
	return (
		<TouchableOpacity
			style={[
				styles.fabContainer,
				style,
				{
					backgroundColor:
						(primary && colors.primary) ||
						(secondary && colors.secondary) ||
						(accent && colors.accent) ||
						color.primary
				}
			]}
			{...otherProps}
		>
			{text && <Text style={styles.fabText}>{text}</Text>}
			{!text && children}
		</TouchableOpacity>
	);
};

export default withColors(FAB);
