import React from 'react';
import {
	View,
	Text,
	TouchableOpacity,
} from 'react-native';

import styles from './styles/ButtonStyle';

const Button = ({title, onPress, full, half, center}) => {
	const k_container = [styles.full];
	if (half) {
		k_container.push(styles.half);
	}

	if (center) {
		k_container.push(styles.center);
	}

	return (
		<View style={k_container}>
			<TouchableOpacity onPress={onPress} style={styles.button}>
				<Text style={styles.text}>{title}</Text>
			</TouchableOpacity>
		</View>
	)
}

export default Button;
