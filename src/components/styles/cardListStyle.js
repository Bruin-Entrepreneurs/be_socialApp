import { StyleSheet } from 'react-native';
import { NAVY } from '../../globals/styles';

export default StyleSheet.create({
	eventContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	image: {
		// flex: 2,
		width: 25,
		height: 25,
		resizeMode: 'contain',
		backgroundColor: 'transparent',
	},
	text: {
		// flex: 8,
		fontSize: 20,
	},
});
