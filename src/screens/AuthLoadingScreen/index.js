import React from "react";
import { ActivityIndicator, StatusBar, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import firebase from "react-native-firebase";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center"
	}
});

class AuthLoadingScreen extends React.Component {
	componentDidMount() {
		firebase.auth().onAuthStateChanged(user => {
			this.props.navigation.navigate(user ? "App" : "Auth");
		});
	}

	// Render any loading content that you like here
	render() {
		return (
			<View style={styles.container}>
				<ActivityIndicator size="large" />
				<StatusBar barStyle="default" />
			</View>
		);
	}
}

export default AuthLoadingScreen;
