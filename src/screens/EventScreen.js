import React from 'react';
import { View } from 'react-native';

import CardList from '../components/CardList';
import { events } from '../../dummyData';

export default class EventScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cards: events,
		};
	}

	componentDidMount() {
		/* TODO */
		/* populate this.state.events w/api call */
	}

	render() {
		return (
			<View style={{ flex: 1 }}>
				<CardList cards={this.state.cards} />
			</View>
		);
	}
}
