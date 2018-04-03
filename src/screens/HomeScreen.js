import React from 'react';
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
			textInputVal: '',
			passwordVal: '', 
		};
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
					<TextInput style={styles.textInputLanding} value={this.state.textInputVal} onChangeText={(text) => this.setState({ textInputVal: text })} />
					<TextInput style={styles.textInputLanding} secureTextEntry={true} value={this.state.passwordVal} onChangeText={(text) => this.setState({ passwordVal: text })} />
					<Button half center title="Welcome!" onPress={() => navigate('UserProfile')}/>
				</View>
			</View>
		);
	}
}
