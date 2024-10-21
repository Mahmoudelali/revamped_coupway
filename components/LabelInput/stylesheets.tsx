import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	header: {
		color: '#554d56',
		fontWeight: 700,
		paddingLeft: 8,
		letterSpacing: 0.5,
	},
	input: {
		height: 56,
		width: '100%',
		color: '#c1bec1',
		borderRadius: 8,
		backgroundColor: '#f7f7f7',
		paddingLeft: 17,
		display: 'flex',
		justifyContent: 'center',
		marginTop: -8,
	},
	inputFocused: {
		backgroundColor: '#cbf5bb50',
	},
	inputError: {
		backgroundColor: '#ffcccb50',
	},
});
