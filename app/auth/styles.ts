import { StyleSheet } from 'react-native';
import { MainColors } from '../helpers/constants';

export default StyleSheet.create({
	tintColor: { color: MainColors.primary },
	svContainer: {
		flex: 1,
		justifyContent: 'center',
		marginTop: -20,
	},
	container: {
		paddingHorizontal: 30,
	},
	separator: {
		marginHorizontal: 'auto',
		height: 2,
		width: 230,
		backgroundColor: MainColors.lightGray,
		marginVertical: 28,
	},
	illustration: {
		aspectRatio: 1,
		height: 150,
		marginHorizontal: 'auto',
	},
	greetings: {
		textAlign: 'center',
		fontWeight: '800',
		fontSize: 28,
		color: MainColors.textColor,
		lineHeight: 34,
		marginVertical: 20,
	},
	loginNow: { color: MainColors.primary },
	textCenter: { textAlign: 'center' },

	orContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 5,
	},
	orSeparator: {
		backgroundColor: MainColors.lightGray,
		width: 20,
		height: 1,
	},
	marginTop: { marginTop: 10 },
});
