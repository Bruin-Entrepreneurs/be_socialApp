import { StyleSheet } from 'react-native';
import { CREAM } from '../../globals/styles';

export default StyleSheet.create({
	creationSubText: {
		fontSize: 25,
		paddingTop: 20,
		paddingLeft: 10,
		fontWeight: 'bold',
	},
	
	nameSubText: {
		fontSize: 15,
		paddingTop: 15,
		paddingLeft: 10,
		width: '50%'
	},
	creationTitleText: {
			fontSize: 40, 
			fontWeight: 'bold', 
			alignSelf: 'center', 
			justifyContent: 'center',
			paddingTop: 10,
	},
	container: {
		flex: 1,
		backgroundColor: CREAM,
		alignItems: 'center',
	},
});
