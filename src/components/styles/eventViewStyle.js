import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	buttonContainer: {
		display: 'flex',
		flexDirection: 'row',
	},
	descriptionContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontSize: 22,
		marginTop: 10,
		marginBottom: 5,
	},
	description: {
		fontSize: 15,
		marginBottom: 10,
		width: '80%',
		textAlign: 'center',
	},
	dateContainer: {
		display: 'flex',
		flexDirection: 'row',
		marginTop: 10,
		marginBottom: 10,
	},
	date: {
		fontSize: 15,
		flex: 1,
		textAlign: 'center',
	},
});

