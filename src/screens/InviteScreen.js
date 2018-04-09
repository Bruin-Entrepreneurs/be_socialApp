import React from 'react'
import {
	Dimensions,
	FlatList,
	Text,
	TextInput,
	View,
} from 'react-native'
import { StackNavigator } from 'react-navigation'
import {
	Avatar,
	List,
	ListItem,
} from 'react-native-elements'


import storage from '../globals/storage'
import Button from '../components/Button'
import styles from './styles/InviteScreenStyle'
import { BASE_URL_PROD } from '../globals/constants'

const moment = require('moment');
const idLocale = require('moment/locale/id');
moment.locale('id', idLocale);

export default class InviteScreen extends React.Component {
	static navigationOptions = {
		title: 'Step 2: Super Invite',
	}

	constructor(props) {
		super(props);
		this.state = {
			searchInput: '',
			unselectedUsers: [],
			selectedUsers: [],
		}
	}

	componentDidMount() {
		const auth = storage.load({
			key: 'auth',
		}).then(
			(auth) => this.setState({ auth: auth }, this._getUsersAsync)
		)
	}

	render() {
		const startMoment = moment(this.props.navigation.state.params.startTime).format("MM/DD/YYYY")
		const endMoment = moment(this.props.navigation.state.params.endTime).format("MM/DD/YYYY")
		const { navigate } = this.props.navigation

		return (
			<View style={styles.container} >
				<Text style={styles.creationSubText}> Time</Text>
				<Text style={styles.creationSubText}> {startMoment} </Text>
				<Text style={styles.creationSubText}> {endMoment} </Text>
				<Text style={styles.creationSubText}> {this.props.navigation.state.params.eventType} </Text>
				<TextInput
					style={{ height: 40, width: 200, borderColor: 'black', borderWidth: 2, }}
					placeholder='Enter Name'
					onChangeText={(text) => this.setState({ searchInput: text })}
				/>

				<View>
					{
						!this.state.unselectedUsers ? (
							<Text> Loading </Text>
						) : (
								<List containerStyle={{ marginBottom: 20, width: 200 }}>
									{
										this.state.unselectedUsers
											.filter((user) => user.username.toLowerCase().includes(this.state.searchInput.toLowerCase()))
											.map(
												(user) => (
													<ListItem
														key={user.id}
														title={user.first_name}
														onPress={(user) => this._handleSelectUserUserAsync(user)}
													/>
												)
											)
									}
								</List>
							)
					}
				</View>


				<List containerStyle={{ marginBottom: 20, width: 200 }}>
					{
						this.state.selectedUsers.map((user, i) => (
							<ListItem
								key={i}
								title={user.first_name}
							/>
						))
					}
				</List>

				<Button full title="Chill!" onPress={this._handleEventCreationAsync} />
			</View>
		)
	}

	_handleSelectUserUserAsync = async (user) => {
		// THIS DOESNT WORK RN SO ITS COMMENTED
		// Add selected user
		// this.setState({ selectedUsers: [...this.state.selectedUsers, user], }, () => console.log(this.state))

		// Remove selected user from list
		var array = this.state.unselectedUsers
		var index = array.indexOf(user.target.value)
		array.splice(index, 1)
		this.setState({ unselectedUsers: array })
	}

	_getUsersAsync = async () => {
		let usersResponse = await fetch(
			BASE_URL_PROD + '/user/',
			{
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + this.state.auth.access_token
				}
			}
		)

		const usersJson = await usersResponse.json()

		if (usersResponse.ok) {
			this.setState({
				unselectedUsers: usersJson
			})
		} else {
			console.log(usersResponse)
		}
	}

	_handleEventCreationAsync = async () => {
		const { navigate } = this.props.navigation
		const data = {
			event_type_id: this.props.navigation.state.params.eventType,
			start_time: this.props.navigation.state.params.startTime,
			end_time: '',
			super_invite_ids: this.state.selectedUsers.map((user) => user.id),
			description: this.props.navigation.state.params.description
		}

		let eventCreationResponse = await fetch(
			BASE_URL_PROD + '/event/',
			{
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + this.state.auth.access_token
				}
			}
		)

		const eventCreationJson = await eventCreationResponse.json()

		if (eventCreationResponse.ok) {
			navigate('Events')
		} else {
			console.log(eventCreationResponse)
		}
	}
}
