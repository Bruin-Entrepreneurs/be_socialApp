import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	descriptionContainer: {
		display: 'flex',
		flexDirection: 'column',
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
	image: {
		width: 25,
		height: 25,
		overflow: 'visible',
		position: 'absolute',
		alignSelf: 'flex-start',
		margin: 8,
	},
});

