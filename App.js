/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StatusBar } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { MenuProvider } from "react-native-popup-menu";
import configureStore from "./src/redux/store";
import AppNavigator from "./src/navigation/AppNavigator";
import { onTokenRefresh } from "./src/utils/Notifications";
import { toggleNotifications } from "./src/redux/reducers/settingsReducer";

const instructions = Platform.select({
	ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
	android:
		"Double tap R on your keyboard to reload,\n" +
		"Shake or press menu button for dev menu"
});

const { store, persistor } = configureStore();

type Props = {};
export default class App extends Component<Props> {
	componentDidMount = async () => {
		this.onTokenRefreshListener = onTokenRefresh(fcmToken => {
			const { settings } = store.getState();
			if (settings.notifications.enabled) {
				store.dispatch(toggleNotifications(fcmToken, true));
			}
		});
	};

	componentWillUnmount() {
		this.onTokenRefreshListener();
	}

	render() {
		return (
			<React.Fragment>
				<StatusBar barStyle="light-content" />
				<Provider store={store}>
					<PersistGate persistor={persistor}>
						<MenuProvider>
							<AppNavigator />
						</MenuProvider>
					</PersistGate>
				</Provider>
			</React.Fragment>
		);
	}
}
