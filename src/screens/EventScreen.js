import React from 'react';
import { View, } from 'react-native';
import { Card, } from 'react-native-elements'; 
import { StackNavigator, } from 'react-navigation';

import CardList from '../components/CardList';
import { events } from '../../data';

export default class EventScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cards: events,
		};
	}
	render() {
		return (
			<View style={{ flex: 1,}}>
				<CardList cards={this.state.cards} />
			</View>
		);
	}
}
