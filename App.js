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
	Button, 
	Avatar, 
	Card,
} from 'react-native-elements'; 
import { CardList } from 'react-native-card-list';
import UserProfile from './screens/UserProfile';
import EventScreen from './screens/EventScreen';
import HomeView from './screens/HomeScreen'; 
import CreationScreen from './screens/CreationScreen'; 
import InviteScreen from './screens/InviteScreen'; 

var {height, width} = Dimensions.get('window');









//------------------------------------------------------



const curStyle = StyleSheet.create({

	profilePicture: {
		height: 150,
		width: 150,
		marginTop: 50,
		alignSelf: 'center',
		justifyContent: 'center',
		marginBottom: 20,

	},
	ProfileName: {
		fontSize: 40,
		color: 'white',
		marginLeft: width / 3,
	},
})

//----------------------------------------------------------------------
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


const App = StackNavigator({
	Home: { screen: HomeView}, 
	Profile: { screen: CreationScreen },
	Invite: {screen: InviteScreen }, 
	UserProfile: { screen: UserProfile },  
	EventScreen: { screen: EventScreen },
});



export default App; 
