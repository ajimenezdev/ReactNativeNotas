import React, { Component } from "react";
import { View, ScrollView, StyleSheet, Switch } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import firebase from "react-native-firebase";
import getBasicStyles from "ReactNativeNotas/src/styles/basicStyles";
import { Text, HR } from "ReactNativeNotas/src/components";
import withColors from "ReactNativeNotas/src/styles/withColors";
import { toggleNotifications } from "ReactNativeNotas/src/redux/reducers/settingsReducer";

const styles = StyleSheet.create({
	list: {
		width: "100%"
	},
	listItem: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingLeft: 10,
		paddingRight: 10,
		height: 60
	}
});

class AppSettings extends Component {
	notificationsChange = async () => {
		const {
			toggleNotifications: toggleNotification,
			notificationSettings
		} = this.props;
		if (!notificationSettings || !notificationSettings.enabled) {
			try {
				await firebase.messaging().requestPermission();
				const fcmToken = await firebase.messaging().getToken();
				console.log("test:fcmToken", fcmToken);
				toggleNotification(fcmToken, true);
			} catch (error) {
				// User has rejected permissions
			}
		} else {
			toggleNotification(null, false);
			// Esto no te desubscribe de notificaciones, pero invalida el token actual
			await firebase.messaging().deleteToken();
		}
	};

	render() {
		const { colors, toggleNotifications, notificationSettings } = this.props;
		const basicStyles = getBasicStyles(colors);
		return (
			<View style={basicStyles.container}>
				<ScrollView style={styles.list}>
					<View style={styles.listItem}>
						<Text>Notificaciones Push</Text>
						<Switch
							onValueChange={this.notificationsChange}
							value={notificationSettings && notificationSettings.enabled}
							thumbColor={colors.accent}
						/>
					</View>
					<HR />
				</ScrollView>
			</View>
		);
	}
}

const mapStateToProps = state => {
	return {
		notificationSettings: state.settings.notifications
	};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ toggleNotifications }, dispatch);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withColors(AppSettings));
