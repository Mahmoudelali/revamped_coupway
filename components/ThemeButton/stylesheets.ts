import { MainColors } from '@/app/helpers/constants';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	default: {
		backgroundColor: MainColors.primary,
		display: 'flex',
		alignItems: 'center',
		paddingVertical: 16,
		lineHeight: 22,
		borderRadius: 8,
	},
	title: {
		fontFamily: 'Poppins',
		fontSize: 17,
		fontWeight: 700,
		color: '#fff',
	},
	DisabledTitle: {
		// color :
	},
	disabled: {
		backgroundColor: '#c0c0c0',
	},
	errorLabel: {
		marginTop: 4,
		color: '#dc3545',
		fontSize: 12,
		fontWeight: 500,
	},
});
