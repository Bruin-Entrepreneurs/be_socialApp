import React from 'react'
import { AuthSession, Permissions, Notifications } from 'expo'
import { BASE_URL_PROD, FB_APP_ID } from '../globals/constants'
import {
	Dimensions,
	Image,
	Text,
	TextInput,
	View,
} from 'react-native'
import { StackNavigator } from 'react-navigation'

import storage from '../globals/storage'
import Button from '../components/Button';
import logo from '../../assets/BE.png';
import styles from './styles/HomeScreenStyle';
import { CREAM } from '../globals/styles';

const { height } = Dimensions.get('window')

export default class HomeScreen extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		headerLeft: <View></View>
	})

	constructor(props) {
		super(props);
		this.state = {
			auth: false,
		}
		this._handlePressAsync = this._handlePressAsync.bind(this);
	}

	componentDidMount() {
		const { navigate } = this.props.navigation

		const auth = storage.load({
			key: 'auth',
		})
		.then((auth) => this.setState({ auth: auth }))
		.catch((e) => console.log('Not logged in'))
	}

	render() {
		const { navigate } = this.props.navigation

		return (
			<View
				style={{
					flexDirection: 'column',
					height: '100%',
					backgroundColor: CREAM,
				}}>
				<View style={styles.logoContainer}>
					<Image source={logo} style={styles.picture} />
					<Text style={styles.titleText} >Hello BE!</Text>
				</View>

				<View style={{ backgroundColor: 'white', flex: 0.4 }}>
					<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
						{
							!this.state.auth ? (
								<Button title="FB Login" onPress={this._handlePressAsync} />
							) : (
									navigate('Profile')
							)
						}
					</View>
				</View>
			</View>
		);
	}

	_handlePressAsync = async () => {
		const redirectUrl = AuthSession.getRedirectUrl()
		const result = await AuthSession.startAsync({
			authUrl:
				`https://www.facebook.com/v2.12/dialog/oauth?response_type=token` +
				`&client_id=${FB_APP_ID}` +
				`&redirect_uri=${encodeURIComponent(redirectUrl)}`,
		})

		if (result.type === 'error') {
			console.log(result.errorCode)
		}
		if (result.type !== 'success') {
			alert('Cannot login through Facebook')
			return
		}

		const accessToken = result.params.access_token
		const notificationToken = await this._registerForPushNotificationsAsync()

		const authResponse = await fetch(
			BASE_URL_PROD + '/user/fb_login',
			{
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					'fb_token': accessToken,
					'notification_token': notificationToken
				})
			}
		)

		const authResponseJson = await authResponse.json()

		storage.save({
			key: 'auth',
			data: authResponseJson.token,
			expires: 1000 * 60 * 20
		})

		storage.save({
			key: 'user',
			data: authResponseJson.user,
			expires: null
		})

		this.setState({
			auth: authResponseJson.token
		})
	}

	_registerForPushNotificationsAsync = async () => {
		const { status: existingStatus } = await Permissions.getAsync(
			Permissions.NOTIFICATIONS
		)
		let finalStatus = existingStatus

		// only ask if permissions have not already been determined, because
		// iOS won't necessarily prompt the user a second time.
		if (existingStatus !== 'granted') {
			// Android remote notification permissions are granted during the app
			// install, so this will only ask on iOS
			const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
			finalStatus = status
		}

		// Stop here if the user did not grant permissions
		if (finalStatus !== 'granted') {
			return ''
		}

		// Get the token that uniquely identifies this device
		const token = await Notifications.getExpoPushTokenAsync()
		return token
	}
}
