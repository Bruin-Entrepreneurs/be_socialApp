import React from 'react'
import {
	Text,
	TextInput,
	View,
} from 'react-native'
import {
	Avatar,
} from 'react-native-elements'
import {
	Notifications,
} from 'expo'
import { HeaderBackButton } from 'react-navigation'

import storage from '../globals/storage'
import styles from './styles/UserProfileStyle'
import Button from '../components/Button'

export default class EditProfile extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		title: 'Edit Profile'
	})

	constructor(props) {
		super(props);
		this.state = {
			user: false,
			auth: false,
		}
	}

	componentDidMount() {
		this._notificationSubscription = Notifications.addListener(this._handleNotification)

		const auth = storage.load({
			key: 'auth',
		}).then((auth) => this.setState({ auth: auth }))
		const user = storage.load({
			key: 'user',
		}).then((user) => this.setState({ user: user }))
	}

	render() {
		const { navigate } = this.props.navigation

		return (
			<View style={styles.screenContainer} >
				<View style={styles.profileContainer}>
					<Avatar xlarge rounded
						containerStyle={styles.profilePicture}
						overlayContainerStyle={{ backgroundColor: 'transparent' }}
						source={{ uri: !this.state.user ? '' : this.state.user.profile_pic_url }}
					/>
					<Text> Username </Text>
					<View style={styles.profileText}>
						<Text style={styles.profileName}> {!this.state.user ? '' : this.state.user.username} </Text>
					</View>
					<Text> Bio </Text>
					<TextInput
						multiline={true}
						numberOfLines={5}
						style={{ paddingLeft: 10, paddingBottom: 10, textAlignVertical: 'top'}}
						value={this.state.bio}
						placeholder='Enter bio'
						onChangeText={(text) => this.setState({ bio: text })}
					/>
					<Button half title='Save' onPress={this._handleSave}/>
				</View>
			</View>
		)
	}

	_handleSave = async () => {
		console.log('saving')
	}

}