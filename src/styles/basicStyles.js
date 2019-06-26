import { StyleSheet } from "react-native";

const getStyles = colors =>
	StyleSheet.create({
		container: {
			flex: 1,
			justifyContent: "flex-start",
			alignItems: "center",
			padding: 10,
			backgroundColor: colors.background
		},
		paper: {
			backgroundColor: colors.backgroundContent,
			padding: 15,
			margin: 5,
			elevation: 1,
			shadowColor: "#000",
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.8,
			shadowRadius: 4
		}
	});

export default getStyles;
