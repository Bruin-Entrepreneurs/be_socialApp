import { StyleSheet } from 'react-native';
import { NAVY } from '../../globals/styles';

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
		shadowColor: "#000000",
		shadowOpacity: 0.8,
		shadowRadius: 2,
		shadowOffset: {
			height: 5,
			width: 2
		}
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
