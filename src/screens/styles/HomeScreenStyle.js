import { StyleSheet } from 'react-native';
import { CREAM } from '../../constants/styles';

export default StyleSheet.create({
	picture: {
		width: 150, 
		height: 150, 
		paddingTop: 120,
		marginTop: 50,
		alignSelf: 'center',
		justifyContent: 'center',
	},
	creationSubText: {
		fontSize: 25, 
		paddingTop: 20,
		paddingLeft: 10, 
		fontWeight: 'bold', 
	}, 
	creationTitleText: {
		fontSize: 40, 
		fontWeight: 'bold', 
		alignSelf: 'center', 
		justifyContent: 'center',
		paddingTop: 10,
	},
	eventContainer: {
		flex: 1,
		backgroundColor: '#fff', 
	}, 
	container: {
		flex: 1,
		backgroundColor: '#b2d8d8',
		alignItems: 'center', 
	},
	textInputLanding: {
		marginTop: 15,
		height: 40, 
		width: 200, 
		borderColor: 'black', 
		borderWidth: 2,
		alignSelf: 'center', 
	},
	titleText: {
		fontSize: 50,
		fontWeight: 'bold', 
		paddingTop: 100,
		marginTop: 50,
		alignSelf: 'center',
	},
	TopButton: {
		backgroundColor: "#792184", 
	},
	logoContainer: {
		flex: 0.6,
		backgroundColor: CREAM,
	}
});
