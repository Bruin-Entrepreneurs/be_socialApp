import React from 'react';
import { AsyncStorage, Text, View } from 'react-native';

import EventList from '../components/EventList';
import { BASE_URL_PROD } from '../constants/constants'

export default class EventsScreen extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
		}
	}

	componentDidMount() {
		['access_token'].map(val => this._getGlobalState(val))
	}

	render() {
		const { navigate } = this.props.navigation
		return (
	      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
	        {
	        	this.state.events ? (
					<View style={{ flex: 1 }}>
						<EventList events={this.state.events} navigate={navigate} />
					</View>
		        ) : (
					<Text> Loading </Text>
		        )
	    	}
	      </View>
		)
	}

	_getEventsAsync = async () => {
	    let eventsResponse = await fetch(
	    	BASE_URL_PROD + '/event/',
			{
			  method: 'GET',
			  headers: {
			    Accept: 'application/json',
			    'Content-Type': 'application/json',
			    Authorization: 'Bearer ' + this.state.access_token
			  }
			}
		)

		const eventsJson = await eventsResponse.json()

    	if (eventsResponse.ok) {
    		this.setState({ 
		    	events: eventsJson
			  })
    	} else {
    		console.log(eventsResponse)
    	}
	}

	_getGlobalState = (value) => {
		const data = {}

		AsyncStorage
			.getItem(value)
			.then((val) => {
				data[value] = val
		    	this.setState(data, this._getEventsAsync)
			})
			.catch((e) => console.log(e))
	}
}
