import { StyleSheet } from 'react-native';
import { NAVY } from '../../globals/styles';

export default StyleSheet.create({
	containerStyle: {
		display: 'flex',
	},
	eventContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		height: 50,
		flex: 1,
		margin: 20,
		marginTop: 40,
		marginBottom: 40,
	},
	image: {
		width: 40,
		height: 40,
		marginRight: 30,
		resizeMode: 'contain',
		backgroundColor: 'transparent',
	},
	text: {
		// flex: 8,
		fontSize: 17,
	},
});
