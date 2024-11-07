import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { NetworkManager } from '../managers/NetworkManager';
import { apiUrls } from '../config';
import { Offer } from './Models';

// Define a type for the slice state
interface SearchState {
	offers?: Offer[];
	categoriesMap: { [key: string]: Offer[] };
}

// Define the initial state using that type
const initialState: SearchState = {
	offers: undefined,
	categoriesMap: {},
} as SearchState;

// Create the slice
const Search = createSlice({
	name: 'search',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getAllOffers.fulfilled, (state, action) => {
			let data = action.payload;
			state.offers = data;

			(state.offers || []).forEach((offer) => {
				let categoryName = offer.category.name;
				if (!state.categoriesMap[categoryName]) {
					state.categoriesMap[categoryName] = [offer];
				} else {
					state.categoriesMap[categoryName].push(offer);
				}
			});
		});
	},
});

export const getAllOffers = createAsyncThunk('/api/getalloffers/', async () => {
	try {
		let response = await NetworkManager.getInstance()?.getRequest(
			apiUrls.allOffers,
		);
		return response;
	} catch (error) {
		console.log('failed to fetch offers', error);
	}
});
// Export the actions
export const {} = Search.actions;

// Export the reducer
export default Search.reducer;
