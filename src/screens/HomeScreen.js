import React from 'react';
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
	Avatar, 
	Card,
} from 'react-native-elements'; 
import { CardList } from 'react-native-card-list';
import Button from '../components/Button';

var {height, width} = Dimensions.get('window');

export default class HomeView extends React.Component {
	constructor(props) {
		super(props); 
		this.state = {
			textInputVal: 'username',
			passwordVal: 'password', 
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
				<View style={{backgroundColor: '#b2d8d8', flex: 0.6}}> 
					<Image source={require('../../assets/BE.png')} style={styles.picture} />
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


