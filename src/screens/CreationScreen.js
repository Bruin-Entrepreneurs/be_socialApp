import React from 'react'
import {
	AsyncStorage,
	Image,
	Picker,
	Text,
	View,
} from 'react-native'
import { StackNavigator } from 'react-navigation'
import Button from '../components/Button'
import styles from './styles/CreationScreenStyle'
import { BASE_URL_PROD } from '../constants/constants'

const moment = require('moment');
const idLocale = require('moment/locale/id');
moment.locale('id', idLocale);

export default class CreationScreen extends React.Component {
	static navigationOptions = {
		title: 'Step 1',
	}

	constructor(props) {
		super(props);
		this.state = {
			chosenDate: new Date(),
			picker: false,
			pickerVal: '',
		}

		this.updateDatePicker = this.updateDatePicker.bind(this);
	}

	async componentDidMount() {
		['access_token', 'refresh_token'].map(val => this._getGlobalState(val))
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
				<Text style={styles.creationTitleText}>Create Event</Text>
				<Text style={styles.creationSubText}>Time</Text>
				<Button full title="date" onPress={() => { }} />
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

				<Button
					title="Next"
					onPress={
						() => navigate('Invite', {
							time: this.state.chosenDate,
							eventType: this.state.pickerVal,
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
					Authorization: 'Bearer ' + this.state.access_token
				}
			}
		)

		const eventTypesJson = await eventTypesResponse.json()
		console.log(JSON.stringify(eventTypesResponse, null, 2))
		console.log('here')
		if (eventTypesResponse.ok) {
			console.log('here 2')
			console.log(eventTypesJson)
			this.setState({
				eventTypes: eventTypesJson
			})
		} else {
			console.log('here 3')
			console.log(eventTypesResponse)
		}
	}

	_getGlobalState = (value) => {
		const data = {}

		AsyncStorage
			.getItem(value)
			.then((val) => {
				data[value] = val
				this.setState(data, this._getEventTypesAsync)
			})
			.catch((e) => console.log(e))
	}
}
