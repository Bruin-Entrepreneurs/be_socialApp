import React from 'react';
import { Card } from 'react-native-elements'; 
import {
	Image,
	ListView,
	StyleSheet,
	Text,
	TouchableHighlight,
	View,
} from 'react-native';

import styles from './styles/cardListStyle'

const EventList = ({events, navigate}) => {
	console.log('2')
	console.log(navigate)
	return (
		<Card>
			{events.map((event, i) => {
				return (
					<TouchableHighlight onPress={() => navigate('EventDetailScreen', {id:event.id})} underlayColor="white">
						<View key={i} style={styles.eventContainer}>
							<Image
								style={styles.image}
								source={{uri: event.event_type.image_url}}
							/>
							<Text style={styles.text}>{event.event_type.name} at {event.start_time}</Text>
						</View>
					</TouchableHighlight>
				)}
			)}
		</Card>
	)
}

export default EventList
