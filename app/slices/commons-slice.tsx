import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface commonsSliceState {
	value: number;
	test: string;
}

// Define the initial state using that type
const initialState = {
	value: 0,
	test: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ',
} as commonsSliceState;

// Create the slice
const commonsSlice = createSlice({
	name: 'commons',
	initialState,
	reducers: {
		setValue: (state, action: PayloadAction<number>) => {
			state.value = action.payload;
		},
	},
});

// Export the actions
export const { setValue } = commonsSlice.actions;

// Export the reducer
export default commonsSlice.reducer;
