import React from 'react'
import {
	Image,
	Picker,
	Text,
	TextInput,
	View,
} from 'react-native'
import { StackNavigator } from 'react-navigation'

import storage from '../globals/storage'
import Button from '../components/Button'
import styles from './styles/CreationScreenStyle'
import { BASE_URL_PROD } from '../globals/constants'

const moment = require('moment');
const idLocale = require('moment/locale/id');
moment.locale('id', idLocale);

export default class DescriptionScreen extends React.Component {
	static navigationOptions = {
		title: 'Step 2: Description',
	}

	constructor(props) {
		super(props);
		this.state = {
			picker: false,
			pickerVal: 0,
			description: '',
		}
		this.updateDatePicker = this.updateDatePicker.bind(this);
	}

	componentDidMount() {
		const auth = storage.load({
			key: 'auth',
		}).then(
			(auth) => this.setState({ auth: auth }, this._getEventTypesAsync)
		)
	}

	updateDatePicker() {
		this.setState(prevState => {
			return Object.assign({}, prevState,
				{
					picker: !this.state.picker,
				}
			)
		})
	}

	toggleModal() {
		this.setState(prevState => {
			return Object.assign({}, prevState,
				{
					picker: !this.state.picker,
				}
			)
		})
	}

	render() {
		const { navigate } = this.props.navigation

		return (
			<View style={styles.eventContainer}>
				<Text style={styles.creationTitleText}>Describe Event</Text>
				<Text style={styles.creationSubText}> Type </Text>

				<View>
					{
						!this.state.eventTypes ? (
							<Text> Loading </Text>
						) : (
								<Picker
									selectedValue={this.state.pickerVal}
									mode="dropdown"
									onValueChange={
										(pickerVal, itemIndex) => this.setState({ pickerVal })
									}>
									{
										this.state.eventTypes.map(
											(eventType, i) => (
												<Picker.Item
													key={eventType.id}
													label={eventType.name}
													value={eventType.id}
												/>
											)
										)
									}
								</Picker>
							)
					}
				</View>

				<Text style={styles.creationSubText}> Description </Text>
				<TextInput
					style={{ paddingLeft: 5 }}
					placeholder='Enter Description'
					onChangeText={(text) => this.setState({ description: text })}
					multiline={true}
					numberOfLines={5}
				/>

				<Button
					title="Next"
					onPress={
						() => navigate('Invite', {
							startTime: this.props.navigation.state.params.startTime,
							endTime: this.props.navigation.state.params.endTime, 
							eventType: this.state.pickerVal,
							description: this.state.description
						}
						)
					}
				/>
			</View>
		)
	}

	_getEventTypesAsync = async () => {
		let eventTypesResponse = await fetch(
			BASE_URL_PROD + '/event/types/',
			{
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + this.state.auth.access_token
				}
			}
		)

		const eventTypesJson = await eventTypesResponse.json()

		if (eventTypesResponse.ok) {
			this.setState({
				eventTypes: eventTypesJson
			})
			// Set initial state for picker value
			this.setState({
				pickerVal: eventTypesJson[0].id
			})
		} else {
			console.log(eventTypesResponse)
		}
	}
}
