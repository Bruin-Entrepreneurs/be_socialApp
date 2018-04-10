import React from 'react'
import {
	Dimensions,
	FlatList,
	Text,
	TextInput,
	ScrollView,
	Image,
	View,
	TouchableOpacity,
} from 'react-native'
import { StackNavigator } from 'react-navigation'
import {
	Avatar,
	List,
	ListItem,
} from 'react-native-elements'

//import ScrollColumns from '../components/scrollColumns'
import storage from '../globals/storage'
import Button from '../components/Button'
import styles from './styles/InviteScreenStyle'
import { BASE_URL_PROD } from '../globals/constants'
import EventView from '../components/EventView'

const moment = require('moment');
const idLocale = require('moment/locale/id');
moment.locale('id', idLocale);

export default class InviteScreen extends React.Component {
	static navigationOptions = {
		title: 'Step 3: Super Invite',
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
		const options = { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }
		const startMoment = this.props.navigation.state.params.startTime.toLocaleString('en-US', options)
		const endMoment = this.props.navigation.state.params.endTime.toLocaleString('en-US', options)
		const { navigate } = this.props.navigation

		return (
			<View style={styles.container} >

				<View style={{ flex: 1, flexDirection: 'row', maxHeight: 50 }}>
					<Text style={styles.creationSubText}> Start:  </Text>
					<Text style={styles.creationSubText}> {startMoment} </Text>
				</View>
				<View style={{ flex: 1, flexDirection: 'row', maxHeight: 50 }}>
					<Text style={styles.creationSubText}> End:  </Text>
					<Text style={styles.creationSubText}> {endMoment} </Text>
				</View>
				<View style={{ flex: 1, flexDirection: 'row', maxHeight: 50 }}>
					<Text style={styles.creationSubText}> Event Type:  </Text>
					<Text style={styles.creationSubText}> {this.props.navigation.state.params.eventType} </Text>
				</View>
				<View style={{ flex: 1, flexDirection: 'row', maxHeight: 80 }}>
					<Text style={styles.creationSubText}> Description: </Text>
					<Text style={styles.nameSubText}> {this.props.navigation.state.params.description} </Text>
				</View>
				<TextInput
					style={{ height: 40, width: 200, borderColor: 'black', borderWidth: 2, }}
					placeholder='Enter Name'
					onChangeText={(text) => this.setState({ searchInput: text })}
				/>

				<View style={{ height: 150, flex: 1, flexDirection: 'row', paddingLeft: 10 }}>
					{
						!this.state.unselectedUsers ? (
							<Text> Loading </Text>
						) : (
								<ScrollView contentContainerStyle={{ marginBottom: 20 }} horizontal={false} alwaysBounceHorizontal={false}>
								{
										this.state.unselectedUsers
											.filter((user) => user.username.toLowerCase().includes(this.state.searchInput.toLowerCase()))
											.map(
												(user) => (
													<TouchableOpacity onPress={() => this._handleSelectUserUserAsync(user)}>
													<View style={{ flex: 1, flexDirection: 'row' }}>
														<Avatar medium rounded
														containerStyle={{ marginTop: 5 }}
														overlayContainerStyle={{ backgroundColor: 'transparent' }}
														source={{ uri: user.profile_pic_url }}
														/>
														<Text style={styles.nameSubText}>
															{user.username}
														</Text>
													</View>
													</TouchableOpacity>
												)
											)
									}
								</ScrollView>
							)
					}


				
					<ScrollView contentContainerStyle={{ marginBottom: 20 }} horizontal={false} alwaysBounceHorizontal={false}>
						{
							this.state.selectedUsers
							.map((user) => (
								<View style={{ flex: 1, flexDirection: 'row' }}>
									<Avatar medium rounded
									containerStyle={{ marginTop: 5 }}
									overlayContainerStyle={{ backgroundColor: 'transparent' }}
									source={{ uri: !user ? '' : user.profile_pic_url }}
									/>
									<Text style={styles.nameSubText}>
										{user.username}
									</Text>
								</View>
								))
						}
					</ScrollView>
				
			</View>
				<Button full title="Chill!" onPress={this._handleEventCreationAsync} />
			</View>
		)
	}

	_handleSelectUserUserAsync = async (user) => {
		this.setState( prevState => ({
			selectedUsers: [...prevState.selectedUsers, user]
		}));		// Remove selected user from list
		var array = this.state.unselectedUsers
		var index = array.indexOf(user)

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
			end_time: this.props.navigation.state.params.endTime,
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
/*



<FlatList 
										data={this.state.unselectedUsers}
										renderItem={() => (
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
										)}
									/>

									*/


/*

<View style={{ height: 150, flex: 1, flexDirection: 'row', paddingLeft: 10 }}>
					{
						!this.state.unselectedUsers ? (
							<Text> Loading </Text>
						) : (
								<ScrollView contentContainerStyle={{ marginBottom: 20 }} horizontal={false} alwaysBounceHorizontal={false}>
								{
										this.state.unselectedUsers
											.filter((user) => user.username.toLowerCase().includes(this.state.searchInput.toLowerCase()))
											.map(
												(user) => (
													<TouchableOpacity onPress={() => this._handleSelectUserUserAsync(user)}>
													<View style={{ flex: 1, flexDirection: 'row' }}>
														<Avatar medium rounded
														containerStyle={{ marginTop: 5 }}
														overlayContainerStyle={{ backgroundColor: 'transparent' }}
														source={{ uri: user.profile_pic_url }}
														/>
														<Text style={styles.nameSubText}>
															{user.username}
														</Text>
													</View>
													</TouchableOpacity>
												)
											)
									}
								</ScrollView>
							)
					}


				
					<ScrollView contentContainerStyle={{ marginBottom: 20 }} horizontal={false} alwaysBounceHorizontal={false}>
						{
							this.state.selectedUsers
							.map((user) => (
								<View style={{ flex: 1, flexDirection: 'row' }}>
									<Avatar medium rounded
									containerStyle={{ marginTop: 5 }}
									overlayContainerStyle={{ backgroundColor: 'transparent' }}
									source={{ uri: !user ? '' : user.profile_pic_url }}
									/>
									<Text style={styles.nameSubText}>
										{user.username}
									</Text>
								</View>
								))
						}
					</ScrollView>
				
			</View>
			*/


