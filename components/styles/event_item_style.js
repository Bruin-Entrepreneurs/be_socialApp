import React, { StyleSheet } from 'react-native';
import { NAVY } from '../common_styles';

export default StyleSheet.create({
	eventitem: {
		borderRadius: 5,
		height: 100,
		borderRadius: 1,
		borderWidth: 0.5,
		borderColor: NAVY,
	},
	name: {
		fontSize: 30,
		fontWeight: 'bold',
		textAlign: 'center',
		marginTop: 20,
		marginBottom: 20,
	},
	navy: {
		color: NAVY,
	},
}
);