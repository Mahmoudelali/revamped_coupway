export enum LocalStorageAction {
	SET,
	GET,
	UPDATE,
	REMOVE,
}

export enum BottomTabScreens {
	HOME = 'home',
	SEARCH = 'search',
	NOTIFICATIONS = 'notifications',
	BASKET = 'basketContainer',
	PROFILE = 'profile',
}

export interface responseModel {
	prodName: string;
}
