import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiUrls } from '../config';
import { NetworkManager } from '../managers/NetworkManager';

enum Langs {
	en = 'en',
	ar = 'ar',
}
interface commonsSliceState {
	isLoggedIn: boolean;
	token: string;
	lang: Langs;
}

const initialState = {
	lang: 'ar',
	isLoggedIn: false,
} as commonsSliceState;

// Create the slice
const commonsSlice = createSlice({
	name: 'commons',
	initialState,
	reducers: {
		setIsLoggedIn: (state, action) => {
			state.isLoggedIn = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(login.fulfilled, (state, action) => {
			let data = action.payload;
			if (!data?.responseError && data?.responseData) {
				state.token = data?.responseData.token;
			}
		});
	},
});

export interface LoginPayload {
	username: string;
	password: string;
}

export const login = createAsyncThunk(
	'/auth/token/login',
	async (payload: LoginPayload) => {
		let data = NetworkManager.getInstance()?.postRequest(
			apiUrls.login,
			payload,
		);
		return data;
	},
);

// Export the actions
export const { setIsLoggedIn } = commonsSlice.actions;

// Export the reducer
export default commonsSlice.reducer;
