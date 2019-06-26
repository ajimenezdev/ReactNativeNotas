import React, { Component } from "react";
import {
	View,
	StyleSheet,
	ActivityIndicator,
	Animated,
	Easing,
	Platform,
	UIManager,
	LayoutAnimation
} from "react-native";
import firebase from "react-native-firebase";
import { Button } from "ReactNativeNotas/src/components";
import withColors from "ReactNativeNotas/src/styles/withColors";
import { Text, TextInput } from "ReactNativeNotas/src/components";

UIManager.setLayoutAnimationEnabledExperimental &&
	UIManager.setLayoutAnimationEnabledExperimental(true);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "space-between",
		alignItems: "center"
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
		margin: 50
	},
	inputs: {
		justifyContent: "center",
		alignItems: "center",
		width: "70%"
	},
	input: {
		width: "100%",
		borderWidth: 1,
		padding: 10,
		margin: 10,
		borderRadius: 5
	},
	buttons: {
		flexDirection: "row",
		margin: 30
	},
	button: {
		width: 150,
		margin: 5
	},
	errorMessage: {
		color: "red"
	}
});

class SignInScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: null,
			password: null,
			passwordConfirm: null,
			signup: false,
			loginScaleAnim: new Animated.Value(1),
			loginActivityOpacityAnim: new Animated.Value(0),
			loginBtnOpacityAnim: new Animated.Value(1),
			shakeAnim: new Animated.Value(0),
			loginOrRegistering: false
		};
	}

	loginAction = () => {
		const { email, password } = this.state;
		this.startLoginAnim();
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(() => this.props.navigation.navigate("App"))
			.catch(error => {
				this.stopLoginAnim();
				this.setState({ errorMessage: error.message });
			});
	};

	signupAction = () => {
		const { email, password, passwordConfirm } = this.state;
		if (password !== passwordConfirm) {
			this.setState({ errorMessage: "Las contraseñas no coincided" });
			return;
		}
		this.startLoginAnim();
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(() => this.props.navigation.navigate("App"))
			.catch(error => {
				this.stopLoginAnim();
				this.setState({ errorMessage: error.message });
			});
	};

	toggleSignupLogin = () => {
		LayoutAnimation.easeInEaseOut();
		this.setState({ signup: !this.state.signup });
	};

	startLoginAnim = () => {
		this.setState({ loginOrRegistering: true });
		const buttonAnimation = Platform.select({
			ios: () =>
				Animated.timing(this.state.loginBtnOpacityAnim, {
					toValue: 0.1,
					duration: 500,
					easing: Easing.inOut(Easing.cubic),
					useNativeDriver: true
				}),
			android: () =>
				Animated.timing(this.state.loginScaleAnim, {
					toValue: 0.3,
					duration: 500,
					easing: Easing.inOut(Easing.cubic),
					useNativeDriver: true
				})
		})();
		Animated.parallel([
			buttonAnimation,
			Animated.timing(this.state.loginActivityOpacityAnim, {
				toValue: 1,
				duration: 500,
				easing: Easing.inOut(Easing.cubic),
				useNativeDriver: true
			})
		]).start();
	};

	stopLoginAnim = () => {
		const buttonAnimation = Platform.select({
			ios: () =>
				Animated.timing(this.state.loginBtnOpacityAnim, {
					toValue: 1,
					duration: 500,
					easing: Easing.inOut(Easing.cubic),
					useNativeDriver: true
				}),
			android: () =>
				Animated.timing(this.state.loginScaleAnim, {
					toValue: 1,
					duration: 500,
					easing: Easing.inOut(Easing.cubic),
					useNativeDriver: true
				})
		})();

		Animated.sequence([
			Animated.parallel([
				buttonAnimation,
				Animated.timing(this.state.loginActivityOpacityAnim, {
					toValue: 0,
					duration: 500,
					easing: Easing.inOut(Easing.cubic),
					useNativeDriver: true
				})
			]),
			Animated.timing(this.state.shakeAnim, {
				toValue: 1,
				duration: 500,
				easing: Easing.inOut(Easing.cubic),
				useNativeDriver: true
			})
		]).start(() => {
			this.setState({ loginOrRegistering: false });
			this.state.shakeAnim.setValue(0); // reset value
		});
	};

	render() {
		const { colors } = this.props;
		const {
			email,
			password,
			passwordConfirm,
			errorMessage,
			signup,
			loginScaleAnim,
			loginActivityOpacityAnim,
			loginBtnOpacityAnim,
			loginOrRegistering,
			shakeAnim
		} = this.state;
		const isAndroid = Platform.OS === "android";
		return (
			<View style={[styles.container, { backgroundColor: colors.background }]}>
				<Text style={styles.title}>ReactNative Notes</Text>
				<View style={styles.inputs}>
					<TextInput
						style={styles.input}
						value={email}
						placeholder={"Email"}
						clearButtonMode="always"
						autoCorrect={false}
						onChangeText={email => this.setState({ email })}
						autoCapitalize="none"
					/>
					<TextInput
						style={styles.input}
						value={password}
						placeholder={"Contraseña"}
						secureTextEntry
						clearButtonMode="always"
						autoCorrect={false}
						onChangeText={password => this.setState({ password })}
						autoCapitalize="none"
					/>

					{signup && (
						<TextInput
							style={styles.input}
							value={passwordConfirm}
							placeholder={"Confirmar Contraseña"}
							secureTextEntry
							clearButtonMode="always"
							autoCorrect={false}
							onChangeText={passwordConfirm =>
								this.setState({ passwordConfirm })
							}
							autoCapitalize="none"
						/>
					)}
					{errorMessage && (
						<Text style={styles.errorMessage}>{errorMessage}</Text>
					)}
				</View>
				{!signup && (
					<View style={styles.buttons}>
						<View style={styles.button}>
							<Button
								secondary
								title="Registro"
								onPress={this.toggleSignupLogin}
							/>
						</View>
						<View style={styles.button}>
							<Animated.View
								style={[
									{
										transform: [{ scaleX: loginScaleAnim }],
										opacity: loginBtnOpacityAnim
									},
									{
										translateX: shakeAnim.interpolate({
											inputRange: [0, 0.2, 0.4, 0.6, 0.8, 0.9, 1],
											outputRange: [0, -10, 10, -10, 10, -10, 0]
										})
									}
								]}
							>
								<Button
									primary
									title={loginOrRegistering && isAndroid ? "" : "Login"}
									onPress={this.loginAction}
								/>
							</Animated.View>
							{loginOrRegistering && (
								<Animated.View
									style={{ marginTop: -28, opacity: loginActivityOpacityAnim }}
								>
									<ActivityIndicator color={colors.accent} />
								</Animated.View>
							)}
						</View>
					</View>
				)}
				{signup && (
					<View style={styles.buttons}>
						<View style={styles.button}>
							<Animated.View
								style={[
									{
										transform: [{ scaleX: loginScaleAnim }],
										opacity: loginBtnOpacityAnim
									},
									{
										translateX: shakeAnim.interpolate({
											inputRange: [0, 0.2, 0.4, 0.6, 0.8, 0.9, 1],
											outputRange: [0, -10, 10, -10, 10, -10, 0]
										})
									}
								]}
							>
								<Button
									primary
									title={loginOrRegistering && isAndroid ? "" : "Registro"}
									onPress={this.signupAction}
								/>
							</Animated.View>
							{loginOrRegistering && (
								<Animated.View
									style={{ marginTop: -28, opacity: loginActivityOpacityAnim }}
								>
									<ActivityIndicator color={colors.accent} />
								</Animated.View>
							)}
						</View>
						<View style={styles.button}>
							<Button
								secondary
								title="Login"
								onPress={this.toggleSignupLogin}
							/>
						</View>
					</View>
				)}
			</View>
		);
	}
}

export default withColors(SignInScreen);
