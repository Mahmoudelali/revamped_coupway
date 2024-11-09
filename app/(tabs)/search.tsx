import React, { useCallback, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../hooks';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, {
	BottomSheetView,
	useBottomSheet,
} from '@gorhom/bottom-sheet';

interface SectionHeaderInfo {}
const Search = () => {
	const dispatch = useAppDispatch();
	let commons = useAppSelector((state) => state.commons);

	const bottomSheetRef = useRef<BottomSheet>(null);

	// callbacks
	const handleSheetChanges = useCallback((index: number) => {
		console.log('handleSheetChanges', index);
	}, []);

	return (
		<GestureHandlerRootView style={styles.container}>
			<BottomSheet
				ref={bottomSheetRef}
				onChange={handleSheetChanges}
				snapPoints={[200, 500]}
			>
				<BottomSheetView style={styles.contentContainer}>
					<Text>Awesome 🎉</Text>
				</BottomSheetView>
			</BottomSheet>
		</GestureHandlerRootView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'grey',
	},
	contentContainer: {
		flex: 1,
		padding: 36,
		alignItems: 'center',
	},
});

export default Search;
