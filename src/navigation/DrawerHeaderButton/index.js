import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const DrawerHeaderButton = ({ navigation }) => (
	<TouchableOpacity onPress={() => navigation.openDrawer()}>
		<Icon style={{ color: "#fff", marginLeft: 15 }} name="menu" size={25} />
	</TouchableOpacity>
);

export default DrawerHeaderButton;
