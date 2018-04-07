import React from 'react';
import {
	Text,
	TouchableOpacity,
	View,
} from 'react-native';

import styles from './styles/buttonStyle';

const Button = ({ title, onPress, full, half, center }) => {
	const containerStyles = [styles.full];	//k is a list of styles for the outer <View>

	if (half) {
		containerStyles.push(styles.half);
	}

	if (center) {
		containerStyles.push(styles.center);
	}

	return (
		<View style={containerStyles}>
			<TouchableOpacity onPress={onPress} style={styles.button}>
				<Text style={styles.text}>{title}</Text>
			</TouchableOpacity>
		</View>
	)
}

export default Button;
