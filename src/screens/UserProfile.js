import React from 'react';
import { 
	Text,
	View,
} from 'react-native';
import { 
	Avatar, 
} from 'react-native-elements'; 
import { StackNavigator } from 'react-navigation';

import styles from './styles/UserProfileStyle';
import Button from '../components/Button';
import { imgURL } from '../../dummyData';

export default class UserProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: 'name_placeholder',
			imageURL: imgURL,
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
