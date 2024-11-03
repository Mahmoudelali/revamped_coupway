import { MainColors } from '@/app/helpers/constants';
import { Dimensions, StyleSheet } from 'react-native';

export default StyleSheet.create({
	switchButton: {
		flexDirection: 'row',
		borderRadius: 20,
		backgroundColor: '#eee',
		overflow: 'hidden',
	},
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
	},
	selectedOption: {
		backgroundColor: MainColors.primary,
		borderRadius: 20,
	},
	unselectedOption: {
		backgroundColor: '#eee',
		color: MainColors.primary,
	},
	text: {
		color: '#FFFFFF',
	},
});
