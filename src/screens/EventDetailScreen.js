import React from 'react'
import { AsyncStorage, Text, View } from 'react-native'

import storage from '../globals/storage'
import { BASE_URL_PROD } from '../globals/constants'

export default class EventDetailScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Event Detail'
    })

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
        const auth = storage.load({
            key: 'auth',
        }).then((auth) => this.setState({ auth: auth }, this._getEventAsync))
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
}
