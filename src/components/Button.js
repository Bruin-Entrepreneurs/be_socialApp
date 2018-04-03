import React from 'react';
import {
	View,
	Text,
	TouchableOpacity,
} from 'react-native';

import styles from './styles/ButtonStyle';

const Button = ({title, onPress, full, half, center}) => {
	const k = [styles.full];	//k is a list of styles for the outer <View>

	if (half) {
		k.push(styles.half);
	}

	if (center) {
		k.push(styles.center);
	}

	return (
		<View style={k}>
			<TouchableOpacity onPress={onPress} style={styles.button}>
				<Text style={styles.text}>{title}</Text>
			</TouchableOpacity>
		</View>
	)
}

export default Button;
