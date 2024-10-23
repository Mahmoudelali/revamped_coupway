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

export enum MainColors {
	primary = '#ee6723',
	titleBlack = '#353935',
	lightGray = '#edeced',
	textColor = '#554d56',
}
