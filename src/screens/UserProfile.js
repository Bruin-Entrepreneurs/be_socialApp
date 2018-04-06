import React from 'react';
import { 
	AsyncStorage,
	Text,
	View,
} from 'react-native';
import { 
	Avatar, 
} from 'react-native-elements'; 
import { HeaderBackButton, StackNavigator } from 'react-navigation';

import styles from './styles/UserProfileStyle';
import Button from '../components/Button';

export default class UserProfile extends React.Component {
	static navigationOptions = ({ navigation }) => ({
	   headerLeft:  <HeaderBackButton
	      onPress={this._handleLogOut}
	      title='Log Out'
	    />,
	    title: 'Profile'
	})

	constructor(props) {
		super(props);
		this.state = {
		}
	}

	componentDidMount() {
		['username', 'profile_pic_url', 'access_token', 'refresh_token']
			.map(
				val => this._getGlobalState(val)
			)
	}
	 
	render() {
		const { navigate } = this.props.navigation

		return (
			<View style={styles.screenContainer} >
				<View style={styles.profileContainer}>
					<Avatar xlarge rounded
						containerStyle={styles.profilePicture} 
						overlayContainerStyle={{backgroundColor: 'transparent'}}
						source={{ uri: this.state.profile_pic_url}}
					/>
					<View style={styles.profileText}>
						<Text style={styles.profileName}> {this.state.username} </Text>
					</View>
					<Button half title='Change'/>
				</View>
				<Button full title="Make an Event" onPress={() => navigate('Profile')} />
				<Button full title="See all Events" onPress={() => navigate('EventsScreen')} />
			</View>
		)
	}

	// NOT WORKING
	_handleLogOut = async () => {
		await AsyncStorage.clear()
		navigate('Home', {loggedIn: false})
  	}

	_getGlobalState = (value) => {
		const data = {}

		AsyncStorage
			.getItem(value)
			.then((val) => {
				data[value] = val
		    	this.setState(data)
			})
			.catch((e) => console.log(e))
	}
}
