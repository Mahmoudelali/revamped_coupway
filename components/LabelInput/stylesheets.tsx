import { MainColors } from '@/app/helpers/constants';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		marginBottom: 6,
	},
	header: {
		color: '#554d56',
		fontWeight: 700,
		paddingLeft: 8,
		letterSpacing: 0.5,
	},
	input: {
		height: 56,
		width: '100%',
		color: MainColors.textColor,
		borderRadius: 8,
		backgroundColor: '#f7f7f7',
		paddingLeft: 17,
		display: 'flex',
		justifyContent: 'center',
		marginTop: -8,
		borderColor: MainColors.lightGray,
		borderWidth: 2,
		paddingStart: 35,
	},
	inputFocused: {
		backgroundColor: '#cbf5bb50',
	},
	inputError: {
		backgroundColor: '#ffcccb50',
	},
	icon: {
		color: MainColors.textColor,
		position: 'absolute',
		top: 10,
		left: 10,
		zIndex: 10,
	},
});
