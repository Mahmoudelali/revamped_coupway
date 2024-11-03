import { configureStore } from '@reduxjs/toolkit';
import commonsSlice from '@/app/slices/commons-slice';
import searchSlice from '@/app/slices/search-slice';

// Create the Redux store and add the slice reducer
const store = configureStore({
	reducer: {
		commons: commonsSlice,
		search: searchSlice,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
