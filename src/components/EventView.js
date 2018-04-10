import React from 'react';
import {
	Text,
	View,
	Image,
} from 'react-native';

import STAR from '../globals/styles';
import styles from './styles/eventViewStyle';

const EventView = ({ title, desc, start_time, end_time, superlike }) => {
	return (
		<View style={styles.descriptionContainer}>
			<Text style={styles.title}>{title}</Text>
			<Text style={styles.description}>Description: {desc}</Text>
			<View style={styles.dateContainer}>
				<Text style={styles.date}>Start: {"\n"}
					{start_time.match('\T(.*?)\Z')[1].slice(0,5)} on {start_time.match('\-(.*?)\T')[1]}</Text>
				<Text style={styles.date}>End: {"\n"}
					{end_time.match('\T(.*?)\Z')[1].slice(0,5)} on {end_time.match('\-(.*?)\T')[1]}</Text>
			</View>
			{superlike && <Image 
				style={styles.image}
				source={{uri: STAR}}
			/>}
		</View>
	)
}

export default EventView;
