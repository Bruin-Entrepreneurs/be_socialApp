import React from 'react';
import { AuthSession } from 'expo';
import { FB_APP_ID, BASE_URL_PROD } from '../constants/constants'

import {
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
			        {!this.state.token ? (
			          <Button title="Open FB Auth" onPress={this._handlePressAsync} />
			        ) : (
			          navigate('UserProfile', { 
			          	name: this.state.name,
			          	token: this.state.token,
			          	profile_pic_url: this.state.profile_pic_url
			          })
			        )}
			      </View>
				</View>
			</View>
		);
	}

    _handlePressAsync = async () => {
    let redirectUrl = AuthSession.getRedirectUrl()

    console.log({ redirectUrl })

    // NOTICE: Please do not actually request the token on the client (see:
    // response_type=token in the authUrl), it is not secure. Request a code
    // instead, and use this flow:
    // https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow/#confirm
    // The code here is simplified for the sake of demonstration. If you are
    // just prototyping then you don't need to concern yourself with this and
    // can copy this example, but be aware that this is not safe in production.

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

    console.log(userInfo)

    this.setState({ 
    	name: userInfo.user.username,
    	token: userInfo.token.access_token,
    	profile_pic_url: userInfo.user.profile_pic_url,
  	})

  }


}
