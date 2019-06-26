import React from "react";
import { TextInput } from "react-native";
import withColors from "ReactNativeNotas/src/styles/withColors";

const CustomTextInput = ({ style, colors, ...props }) => (
	<TextInput
		style={[{ color: colors.text }, style]}
		placeholderTextColor={colors.placeHolder}
		{...props}
	/>
);

export default withColors(CustomTextInput);
