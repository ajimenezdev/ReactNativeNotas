import firebase from "react-native-firebase";

// Escucha cambios en el FCM token asignado
const onTokenRefresh = callback =>
	firebase.messaging().onTokenRefresh(fcmToken => callback(fcmToken));

// Se ejecuta cuando se recibe una notificacion mientras la aplicacion esta abierta on en segundo plano
const onNotification = callback =>
	firebase
		.notifications()
		.onNotification(notification => callback(notification));

// Se ejecuta cuando haces tap en una notificacion mientras la aplicacion esta en primer o segundo plano
const onNotificationOpened = callback =>
	firebase
		.notifications()
		.onNotificationOpened((notificationOpen: NotificationOpen) => {
			const action = notificationOpen.action;
			const notification: Notification = notificationOpen.notification;
			callback({ action, notification });
		});

// Detecta si se ha abierto la aplicacion desde estado cerrado, al hacer click en una notificacion
const onInitialNotification = async callback => {
	const notificationOpen = (NotificationOpen = await firebase
		.notifications()
		.getInitialNotification());
	if (notificationOpen) {
		const action = notificationOpen.action;
		const notification: Notification = notificationOpen.notification;
		callback({ action, notification });
	}
};

export {
	onTokenRefresh,
	onNotification,
	onNotificationOpened,
	onInitialNotification
};
