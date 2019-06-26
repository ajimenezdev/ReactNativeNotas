import React from "react";
import { Button } from "react-native";
import withColors from "ReactNativeNotas/src/styles/withColors";

const CustomButton = ({
	primary,
	secondary,
	accent,
	danger,
	colors,
	...otherProps
}) => (
	<Button
		{...otherProps}
		color={
			(primary && colors.primary) ||
			(secondary && colors.secondary) ||
			(accent && colors.accent) ||
			(danger && colors.danger)
		}
	/>
);

export default withColors(CustomButton);
