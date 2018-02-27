import React from 'react';
import { View } from 'react-native';
import EventList from '../components/eventlist';

class DisplayEventsScreen extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { navigate } = this.props.navigation;
		const { eventsArray } = this.props.navigation.state.params;
		
		return(
			<View>
				<EventList events={eventsArray}/>
				<Button onPress={() => navigate('Profile')} title="Create Event" />
			</View>
		);
	}
}

export default DisplayEventsScreen;