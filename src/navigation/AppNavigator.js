import React from "react";
import {
	createAppContainer,
	createStackNavigator,
	createDrawerNavigator,
	createMaterialTopTabNavigator,
	createSwitchNavigator
} from "react-navigation";

import {
	NotesScreen,
	NoteScreen,
	CategoriesScreen,
	StylesScreen,
	AppSettings,
	SettingsScreen3,
	SignInScreen,
	AuthLoadingScreen
} from "ReactNativeNotas/src/screens";
import withColors from "ReactNativeNotas/src/styles/withColors";
import CustomDrawer from "./CustomDrawer";

const getHeaderConfig = colors => ({
	defaultNavigationOptions: {
		headerStyle: {
			backgroundColor: colors.primary
		},
		headerTintColor: colors.primaryTextContrast,
		headerTitleStyle: {
			fontWeight: "bold"
		}
	}
});

const getAppStack = colors => {
	const headerConfig = getHeaderConfig(colors);
	return createAppContainer(
		createDrawerNavigator(
			{
				Notas: createStackNavigator(
					{
						Notes: NotesScreen,
						Note: NoteScreen
					},
					{
						...headerConfig
					}
				),
				Categorias: createStackNavigator(
					{
						Categories: CategoriesScreen
					},
					{
						...headerConfig
					}
				),
				Settings: createStackNavigator(
					{
						Settings: createMaterialTopTabNavigator(
							{
								Estilos: StylesScreen,
								App: AppSettings,
								tab3: SettingsScreen3
							},
							{
								navigationOptions: {
									title: "Ajustes"
								},
								tabBarOptions: {
									style: {
										backgroundColor: colors.primary
									}
								}
							}
						)
					},
					{
						...headerConfig,
						defaultNavigationOptions: {
							...headerConfig.defaultNavigationOptions,
							headerStyle: {
								...headerConfig.defaultNavigationOptions.headerStyle,
								elevation: 0,
								borderBottomWidth: 0
							}
						}
					}
				)
			},
			{
				contentComponent: props => <CustomDrawer {...props} />
			}
		)
	);
};

const AuthStack = createStackNavigator(
	{ SignIn: SignInScreen },
	{
		mode: "modal",
		headerMode: "none"
	}
);

const AppStackComp = ({ colors }) => {
	const AppStack = getAppStack(colors);
	return <AppStack />;
};

export default createAppContainer(
	createSwitchNavigator(
		{
			AuthLoading: AuthLoadingScreen,
			App: withColors(AppStackComp),
			Auth: AuthStack
		},
		{
			initialRouteName: "AuthLoading"
		}
	)
);
