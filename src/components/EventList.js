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

import styles from './styles/eventListStyle'

const EventList = ({ events, navigate }) => {
	return (
		<Card containerStyle={styles.containerStyle}>
			{events.map((event, i) => {
				return (
					<TouchableHighlight key={i} onPress={() => navigate('EventDetail', { id: event.id })} underlayColor="white">
						<View key={i} style={styles.eventContainer}>
							<Image
								style={styles.image}
								source={{ uri: event.event_type.image_url }}
							/>
							<Text style={styles.text}>{event.event_type.name} at {event.start_time.match('\T(.*?)\Z')[1].slice(0,5)} on {event.start_time.match('\-(.*?)\T')[1]}</Text>
						</View>
					</TouchableHighlight>
				)
			}
			)}
		</Card>
	)
}

export default EventList
