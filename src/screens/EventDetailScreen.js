import React from 'react';
import { AsyncStorage, Text, View } from 'react-native';

import { BASE_URL_PROD } from '../constants/constants'

export default class EventDetailScreen extends React.Component {
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
	        	this.state.event ? (
					<View style={{ flex: 1 }}>
					</View>
		        ) : (
					<Text> Loading Event </Text>
		        )
	    	}
	      </View>
		)
	}

	_getEventAsync = async () => {
        const eventId = this.props.navigation.state.params.id
	    let eventResponse = await fetch(
	    	BASE_URL_PROD + '/event/' + eventId,
			{
			  method: 'GET',
			  headers: {
			    Accept: 'application/json',
			    'Content-Type': 'application/json',
			    Authorization: 'Bearer ' + this.state.access_token
			  }
			}
		)

		const eventJson = await eventResponse.json()

    	if (eventResponse.ok) {
    		this.setState({ 
		    	event: eventJson
			  })
    	} else {
    		console.log(eventResponse)
    	}
	}

	_getGlobalState = (value) => {
		const data = {}

		AsyncStorage
			.getItem(value)
			.then((val) => {
				data[value] = val
		    	this.setState(data, this._getEventAsync)
			})
			.catch((e) => console.log(e))
	}
}
