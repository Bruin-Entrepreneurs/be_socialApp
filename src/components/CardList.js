import React from 'react';
import { Card, } from 'react-native-elements'; 
import {
	ListView, 
	View,
	Text,
	Image,
} from 'react-native';

import styles from './styles/CardListStyle';

const EventList = ({cards}) => {
	return (
		<Card>
			{cards.map((card, i) => {
				return (
	        <View key={i} style={styles.eventContainer}>
	          <Image
	          	style={styles.image}
	            source={{uri: card.img}}
          	/>
          	<Text style={styles.text}>{card.title}</Text>
	        </View>
        )}
			)}
		</Card>
	)
}

export default EventList;
