import React from "react";
import { View, Modal, StyleSheet } from "react-native";
import ColorPalette from "react-native-color-palette";
import getBasicStyles from "ReactNativeNotas/src/styles/basicStyles";
import withColors from "ReactNativeNotas/src/styles/withColors";
import { Text } from "ReactNativeNotas/src/components";

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.2)"
	},
	content: {
		height: 100,
		maxWidth: "80%"
	},
	title: {
		fontWeight: "bold",
		fontSize: 16
	}
});

const ColorPicker = ({
	selectedColor,
	onChange,
	visible,
	onRequestClose,
	colors
}) => {
	const basicStyles = getBasicStyles(colors);
	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={visible}
			onRequestClose={onRequestClose}
		>
			<View style={styles.container}>
				<View style={[basicStyles.paper, styles.content]}>
					<ColorPalette
						onChange={onChange}
						defaultColor={selectedColor || ""}
						colors={colors.categoryColors}
						title={<Text style={styles.title}>Elige el color:</Text>}
						// icon={}
						paletteStyles={{
							justifyContent: "center",
							alignItems: "center"
						}}
					/>
				</View>
			</View>
		</Modal>
	);
};

export default withColors(ColorPicker);
