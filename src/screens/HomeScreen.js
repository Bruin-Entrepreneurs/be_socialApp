import React from 'react';
import { AuthSession } from 'expo';
import { BASE_URL_PROD, FB_APP_ID } from '../constants/constants'
import {
	AsyncStorage,
	Dimensions,
 	Image,
	Text,
	TextInput,
	View,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import Button from '../components/Button';
import logo from '../../assets/BE.png';
import styles from './styles/HomeScreenStyle';

const { height } = Dimensions.get('window');

export default class HomeScreen extends React.Component {
	constructor(props) {
		super(props); 
		this.state = {
			loggedIn: false
		}
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


				<View style={{backgroundColor: 'white', flex: 0.4}}>
			      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			        {
			        	!this.state.loggedIn ? (
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
			    'fb_token': accessToken
			  })
			}
		)

	    const userInfo = await authResponse.json()

	    await AsyncStorage.setItem('username', userInfo.user.username)
	    await AsyncStorage.setItem('profile_pic_url', userInfo.user.profile_pic_url)
	    await AsyncStorage.setItem('access_token', userInfo.token.access_token)
	    await AsyncStorage.setItem('refresh_token', userInfo.token.refresh_token)

	    this.setState({
	    	loggedIn: true
	    })
	}
}
