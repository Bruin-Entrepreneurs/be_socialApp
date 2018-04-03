import { StyleSheet } from 'react-native';
import { NAVY } from '../../constants/styles';

export default StyleSheet.create({
	screenContainer: {
		display: 'flex',
		flexDirection: 'column',
		flexWrap: 'wrap',
		height: '100%',
	},
	profileContainer: {
		flex: .8,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	profilePicture: {
		flex: .5,
		backgroundColor: 'transparent',
	},
	profileText: {
		flex: .2,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	profileName: {
		fontSize: 25,
		color: NAVY,
		display: 'flex',
		alignContent: 'center',
		justifyContent: 'center',
	},
	profileButton: {
		flex: .2,
	},
	buttonContainer: {		
		flex: .2,
		display: 'flex',
		alignItems: 'center',
	},
		button: {
			flex: .5,
			minWidth: '80%',
		}
});
