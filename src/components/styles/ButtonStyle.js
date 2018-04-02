import React, { StyleSheet } from 'react-native';
import { NAVY, CREAM } from '../../constants/styles';

export default StyleSheet.create({
	full: {
		display: 'flex',
		justifyContent: 'center',
		alignContent: 'center',
		alignItems: 'center',
		marginTop: 10,
	},
	half: {
		width: '50%',
	},
	center: {
		marginLeft: '25%',
	},
	button: {
		backgroundColor: NAVY,
    borderColor: "transparent",
    alignItems: 'center',
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    width: '75%',
	},
	text: {
		fontSize: 17,
		color: CREAM,
		margin: 12,
	}
});
