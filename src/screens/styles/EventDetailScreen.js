import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		flex: 1,
		display: 'flex',
		flexWrap: 'wrap',
		backgroundColor: '#fff',
	},
	buttonContainer: {
		display: 'flex',
		flexDirection: 'row',
	},
	acceptDeclineText: {
		fontSize: 20, 
		fontWeight: 'bold', 
		paddingTop: 10,
	}, 
	nameSubText: {
		fontSize: 15,
		paddingTop: 15,
		paddingLeft: 10,
		width: '50%'
	},
});
