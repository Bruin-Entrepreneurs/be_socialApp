import React from 'react';
import { AuthSession } from 'expo';
import { 
	Alert, 
	DatePickerIOS, 
	StyleSheet, 
	Text, 
	View, 
	AppRegistry, 
	Image, 
	TextInput, 
	Picker, 
	Dimensions, 
	ScrollView, 
	FlatList,
} from 'react-native';
import { StackNavigator, } from 'react-navigation';
import { 
	List, 
	ListItem, 
	Button, 
	Avatar, 
	Card,
} from 'react-native-elements'; 
import { CardList } from 'react-native-card-list';
import { FB_APP_ID, BASE_URL_PROD } from '../constants/constants'

var {height, width} = Dimensions.get('window')

export default class HomeView extends React.Component {
	constructor(props) {
		super(props); 
		this.state = {
		}
	}

	render() {
		const { navigate } = this.props.navigation; 
		
		return (
			<View style={{flexDirection: 'column', height: height}}>
				<View style={{backgroundColor: '#b2d8d8', flex: 0.6}}> 
					<Image source={require('../../assets/BE.png')} style={styles.picture} />
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

const styles = StyleSheet.create({
	picture: {
	    width: 150, 
	    height: 150, 
	    paddingTop: 120,
	    marginTop: 50,
	    alignSelf: 'center',
	    justifyContent: 'center',
	},
	
	creationSubText: {
	    fontSize: 25, 
	    paddingTop: 20,
	    paddingLeft: 10, 
	    fontWeight: 'bold', 
	}, 
	creationTitleText: {
	    fontSize: 40, 
	    fontWeight: 'bold', 
	    alignSelf: 'center', 
	    justifyContent: 'center',
	    paddingTop: 10,
	},
	eventContainer: {
	    flex: 1,
	    backgroundColor: '#fff', 
	}, 
	
  container: {
    flex: 1,
    backgroundColor: '#b2d8d8',
    alignItems: 'center',
     
  },
  textInputLanding: {
  	marginTop: 15,
  	height: 40, 
  	width: 200, 
  	borderColor: 'black', 
  	borderWidth: 2,
  	alignSelf: 'center', 
  },
 
  titleText: {
	    fontSize: 50,
	    fontWeight: 'bold', 
	    paddingTop: 100,
	    marginTop: 50,
	    alignSelf: 'center',
  },
  TopButton: {
  		backgroundColor: "#792184", 
  },
});


