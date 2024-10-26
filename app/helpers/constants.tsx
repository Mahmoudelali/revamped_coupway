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

export class MainColors {
	static primary = '#ee6723';
	static titleBlack = '#353935';
	static lightGray = '#edeced';
	static textColor = '#554d56';
	static textError = '#DC4C64';
}

export enum FormErrors {
	USERNAME_REQUIRED = 'username_required',
	PASSWORD_REQUIRED = 'password_required',
	INVALID_EMAIL = 'invalid_email',
	WRONG_CREDS = 'wrong_username',
	SERVER_ERROR = 'internal_server_error',
	none = '',
}

export const isValidEmail = (email: string): boolean | null => {
	const emailRegex =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const match = email.toLowerCase().match(emailRegex);
	return match ? true : null;
};

export enum StatusCodes {
	OK = 200,
	CREATED = 201,
	ACCEPTED = 202,

	// 4xx Client Errors
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	METHOD_NOT_ALLOWED = 405,
	CONFLICT = 409,

	INTERNAL_SERVER_ERROR = 500,
	NOT_IMPLEMENTED = 501,
	BAD_GATEWAY = 502,
	SERVICE_UNAVAILABLE = 503,
	GATEWAY_TIMEOUT = 504,
}
