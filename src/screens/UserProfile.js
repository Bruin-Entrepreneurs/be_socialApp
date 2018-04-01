import React from 'react';
import { 
	View,
	Text,
} from 'react-native';
import { 
	Button, 
	Avatar, 
} from 'react-native-elements'; 
import { StackNavigator, } from 'react-navigation';
import styles from './styles/UserProfileStyle';
import { NAVY } from '../constants/styles'

export default class UserProfile extends React.Component {
	static navigationOptions = {
	    title: 'Profile',
  	}

	constructor(props) {
		super(props);
		this.state = {
			name: this.props.navigation.state.params.name,
			token: this.props.navigation.state.params.token,
			profile_pic_url: this.props.navigation.state.params.profile_pic_url,
		};
	}

	componentDidMount() {
		/*  TO DO:
				fetch call to populate state */
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
						<Text style={styles.profileName}> {this.state.name} </Text>
					</View>
					<Button rounded style={styles.profileButton} color='white' backgroundColor={ NAVY } title='Change' />
				</View>
				<View style={styles.buttonContainer}>
					<Button rounded style={styles.button} color='white' backgroundColor={ NAVY } title="Make an Event" onPress={() => navigate('Profile')} />
					<Button rounded style={styles.button} color='white' backgroundColor={ NAVY } title="See all Events" onPress={() => navigate('EventScreen')} />
				</View>
			</View>
		);
	}
}
