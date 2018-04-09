import React from 'react';
import { AsyncStorage, Text, View } from 'react-native';

import storage from '../globals/storage';
import { BASE_URL_PROD } from '../globals/constants';
import Button from '../components/Button';
import EventView from '../components/EventView';
import styles from './styles/EventDetailScreen';

export default class EventDetailScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Event Detail'
    })

    constructor(props) {
        super(props)
        this.state = {
            event: false,
            superInvited: false,
            responded: false,
            err: false,
        }

        this._getEventAsync = this._getEventAsync.bind(this);
    }

	componentDidMount() {
        const user = storage.load({
			key: 'user',
		}).then((user) => this.setState({ user: user }))
    
		const auth = storage.load({
			key: 'auth',
		}).then(
			(auth) => this.setState(prevState => {
				return Object.assign({}, prevState, 
					{
						auth: auth,
					}
				);
			}, this._getEventAsync)
		)

        alert(this.props.navigation.state.params.id)
        alert(this.state)
	}

	render() {
		const { navigate } = this.props.navigation;
		const eventType = this.state.event.event_type;

		return (
			<View style={styles.container}>
				{
					this.state.event ? (
						<View style={{ flex: 1 }}>
								<EventView superlike={this.state.superInvited} title={eventType.name} desc={this.state.event.description} start_time={this.state.event.start_time} end_time={this.state.event.end_time} />
								{!this.state.responded && <View style={styles.buttonContainer}>
									<Button half title="Accept" />
									<Button half title="Decline" />
								</View>
							}
						</View>
					) : (
						<Text> Loading Event </Text>
					)
				}
				{this.state.err && <Text>Error: {this.state.err}</Text>}
			</View>
		)
	}

  
    _getEventAsync = async () => {
        const eventId = this.props.navigation.state.params.id;
        const eventResponse = await fetch(
            BASE_URL_PROD + '/event/' + eventId,
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + this.state.auth.access_token
                }
            }
        )

        const eventJson = await eventResponse.json();

        if (eventResponse.ok) {
          this.setState(prevState => {
            return Object.assign({}, prevState, 
              {
                event: eventJson,
                responded: (eventJson.accepted.includes(Number(prevState.user.id)) || eventJson.declined.includes(Number(prevState.user.id))),
                superInvited: (eventJson.super_invited.includes(Number(prevState.user.id))),
              }
            )
          })
        } else {
          this.setState(prevState => {
            return Object.assign({}, prevState, 
              {
                err: eventResponse.statusCode,
              }
            )
          })
        }
    }

    _handleAccept = async () => {
        const eventId = this.props.navigation.state.params.id
        const acceptResponse = await fetch(
            BASE_URL_PROD + '/event/' + eventId + '/accept/',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + this.state.auth.access_token
                }
            }
        )

        if (acceptResponse.ok) {
          
        } else {
          
        }
    }

    _handleDecline = async () => {
        const eventId = this.props.navigation.state.params.id
        const declineResponse = await fetch(
            BASE_URL_PROD + '/event/' + eventId + '/decline/',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + this.state.auth.access_token
                }
            }
        )

        if (declineResponse.ok) {
          
        } else {
          
        }
    }
}
