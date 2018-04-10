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
		paddingTop: 20,
		paddingBottom: 20,
		marginTop: 2,
		marginBottom: 2,
		borderStyle: 'dashed',
		borderColor: NAVY,
		borderWidth: 2,
		borderRadius: 10,
	},
	image: {
		width: 30,
		height: 30,
		marginRight: 20,
		marginLeft: 10,
		resizeMode: 'contain',
		backgroundColor: 'transparent',
	},
	text: {
		fontSize: 20,
	},
});
