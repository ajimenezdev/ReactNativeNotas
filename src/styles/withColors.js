import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";

export const colors = {
	primary: "#0066ff",
	primaryTextContrast: "#fff",
	secondary: "#ccc",
	accent: "#00b0a5",
	background: "#fff",
	shadowColor: "#000",
	danger: "#ff3232",
	background: "rgb(240,240,240)",
	backgroundContent: "#fff",
	text: "#111",
	placeHolder: "#aaa",
	categoryColors: ["#FFB3BA", "#FFDEB9", "#FFFFB9", "#B9FFC9", "#BAE0FF"]
};

export const colorsDark = {
	primary: "#000055",
	primaryTextContrast: "#fff",
	secondary: "#ccc",
	accent: "#5cede3",
	danger: "#ff3232",
	background: "rgb(60,60,60)",
	backgroundContent: "#222",
	shadowColor: "#fff",
	text: "#fff",
	placeHolder: "#aaa",
	headerText: "#fff",

	categoryColors: ["#ed4e5b", "#ffa94f", "#bcbc51", "#45f76b", "#6dc0ff"]
};

const withColors = Element => ({ styleSettingsHOC, ...props }) => (
	<Element
		{...props}
		colors={styleSettingsHOC.darkMode ? colorsDark : colors}
	/>
);

const mapStateToProps = state => {
	return {
		styleSettingsHOC: state.settings.styles
	};
};

const composedHoc = compose(
	connect(mapStateToProps),
	withColors
);
export default composedHoc;
