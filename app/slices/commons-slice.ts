import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiUrls } from '../config';
import { NetworkManager } from '../managers/NetworkManager';
import store from '../store';
import localize from '@/components/Langs/Langs';
import { LocalStorageAction, StatusCodes } from '../helpers/constants';
import { localStorageAction } from '../helpers/helperFuncs';

enum Langs {
	en = 'en',
	ar = 'ar',
}
interface commonsSliceState {
	isLoggedIn: boolean;
	token: null | string;
	lang: Langs;
	formError: FormErrors;
	isLoading: boolean;
}

export interface LoginPayload {
	username: string;
	password: string;
}

export enum FormErrors {
	USERNAME_REQUIRED = 'username_required',
	PASSWORD_REQUIRED = 'password_required',
	INVALID_EMAIL = 'invalid_email',
	WRONG_CREDS = 'wrong_username',
	SERVER_ERROR = 'internal_server_error',
	none = '',
}
const initialState = {
	lang: 'en',
	isLoggedIn: false,
	formError: FormErrors.none,
	token: '',
	isLoading: false,
} as commonsSliceState;

// Create the slice
const commonsSlice = createSlice({
	name: 'commons',
	initialState: initialState,
	reducers: {
		setIsLoggedIn: (state, action) => {
			state.isLoggedIn = action.payload;
		},
		setFormError: (state, action) => {
			state.formError = action.payload as FormErrors;
		},
		resetToken: (state) => {
			state.token = null;
			state.isLoggedIn = false;
		},
		setIsLoading: (state, action) => {
			state.isLoading = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(login.fulfilled, (state, action) => {
			let data = action.payload;
			if (!!data?.status) {
				console.log(data.status, data);
				switch (data.status) {
					case StatusCodes.OK:
						if (!data?.responseError && data?.responseData) {
							state.token = data?.responseData.token;
							state.isLoggedIn = true;
						}
						break;
					case StatusCodes.BAD_REQUEST:
						setFormError(FormErrors.WRONG_CREDS);
						break;
					case StatusCodes.NOT_FOUND:
						setFormError(FormErrors.WRONG_CREDS);
						break;
					case StatusCodes.INTERNAL_SERVER_ERROR:
						setFormError(FormErrors.SERVER_ERROR);
						break;
				}
			}
		});
	},
});

export const login = createAsyncThunk(
	'/auth/token/login',
	async (payload: LoginPayload) => {
		let data = await NetworkManager.getInstance()?.postRequest(
			apiUrls.login,
			payload,
		);
		return data;
	},
);

// Export the actions
export const { setIsLoggedIn, setFormError, resetToken, setIsLoading } =
	commonsSlice.actions;

// Export the reducer
export default commonsSlice.reducer;
