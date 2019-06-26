const TOGGLE_DARKMODE = "settings/TOGGLE_DARKMODE";
const TOGGLE_NOTIFICATIONS = "settings/TOGGLE_NOTIFICATIONS";

const defaultState = {
	styles: {
		darkMode: false
	},
	notifications: {
		enabled: false,
		token: null
	}
};

export default function reducer(state = defaultState, action) {
	switch (action.type) {
		case TOGGLE_DARKMODE:
			return {
				...state,
				styles: { ...state.styles, darkMode: !state.styles.darkMode }
			};
		case TOGGLE_NOTIFICATIONS:
			return {
				...state,
				notifications: { enabled: action.enabled, token: action.token }
			};
		default:
			return state;
	}
}

export function toggleDarkMode() {
	return {
		type: TOGGLE_DARKMODE
	};
}

export function toggleNotifications(token, enabled) {
	// TODO: sincronizar True/False con servidor, para evitar recibir notificaciones
	return {
		type: TOGGLE_NOTIFICATIONS,
		token,
		enabled
	};
}
