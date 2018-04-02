import React from 'react';
import { 
	View,
	Text,
} from 'react-native';
import { 
	Avatar, 
} from 'react-native-elements'; 
import { StackNavigator, } from 'react-navigation';
import styles from './styles/UserProfileStyle';
import { NAVY } from '../constants/styles'
import Button from '../components/Button';

export default class UserProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: 'name_placeholder',
			imageURL: 'https://pbs.twimg.com/profile_images/862164234947440640/WqQ358Yw_400x400.jpg',
		};
	}
	componentDidMount() {
		/*  TO DO:
				fetch call to populate state */
	}
	 
	render() {
		const { navigate } = this.props.navigation;

		return (
			<View style={styles.screenContainer} >
				<View style={styles.profileContainer}>
					<Avatar xlarge rounded
						containerStyle={styles.profilePicture} 
						overlayContainerStyle={{backgroundColor: 'transparent'}}
						source={{ uri: this.state.imageURL}}
					/>
					<View style={styles.profileText}>
						<Text style={styles.profileName}> {this.state.name} </Text>
					</View>
					<Button half title='Change'/>
				</View>
				<Button full title="Make an Event" onPress={() => navigate('Profile')} />
				<Button full title="See all Events" onPress={() => navigate('EventScreen')} />
			</View>
		);
	}
}
