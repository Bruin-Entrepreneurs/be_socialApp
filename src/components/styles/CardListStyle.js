import { StyleSheet } from 'react-native';
import { NAVY } from '../../constants/styles';

export default StyleSheet.create({
	eventContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	image: {
		flex: .2,
		margin: 10,
		width: 500,
		height: 50,
		resizeMode: 'contain',
		backgroundColor: 'transparent',
	},
	text: {
		flex: .8,
		fontSize: 20,
	},
});
