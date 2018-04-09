import React from 'react';
import { AuthSession } from 'expo';
import { BASE_URL_PROD, FB_APP_ID } from '../globals/constants'
import {
	Dimensions,
	Image,
	Text,
	TextInput,
	View,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import storage from '../globals/storage'
import Button from '../components/Button';
import logo from '../../assets/BE.png';
import styles from './styles/HomeScreenStyle';

const { height } = Dimensions.get('window');

export default class HomeScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		}
		this._handlePressAsync = this._handlePressAsync.bind(this);
	}

	render() {
		const { navigate } = this.props.navigation;

		return (
			<View
				style={{
					flexDirection: 'column',
					height: height,
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
									navigate('UserProfile')
							)
						}
					</View>
				</View>
			</View>
		);
	}

	_handlePressAsync = async () => {
		let redirectUrl = AuthSession.getRedirectUrl()
		console.log(redirectUrl)
		let result = await AuthSession.startAsync({
			authUrl:
				`https://www.facebook.com/v2.12/dialog/oauth?response_type=token` +
				`&client_id=${FB_APP_ID}` +
				`&redirect_uri=${encodeURIComponent(redirectUrl)}`,
		})

		if (result.type !== 'success') {
			alert('Uh oh, something went wrong')
			return
		}

		let accessToken = result.params.access_token

		let authResponse = await fetch(
			BASE_URL_PROD + '/user/fb_login',
			{
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					'fb_token': accessToken,
					'notification_token': '',
				})
			}
		)

		const authResponseJson = await authResponse.json()
		console.log(authResponseJson)
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
}
