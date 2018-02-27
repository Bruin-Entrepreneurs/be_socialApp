import React from 'react';
import { Alert, DatePickerIOS, StyleSheet, Text, View, AppRegistry, Image, TextInput, Picker } from 'react-native';
import { StackNavigator, } from 'react-navigation';
import { List, ListItem, Button } from 'react-native-elements'; 
import EventList from './components/event_list';

/* import dummy data for testing
*/
import {
	moment,
	idLocale,
	pic2,
	allNames,
	dummyEvents,
} from './dummy.js';



class HomeScreen extends React.Component {
	constructor() {
		super();
		this.state = {
			eventsArray: dummyEvents,
		}
	}
	
	componentWillMount() {
		// fetch call goes here to fill eventsArray
	}

	render() {
		const { navigate } = this.props.navigation; 
		const eventsArray = this.state.eventsArray;
		const pic = {
			uri: 'https://pbs.twimg.com/profile_images/862164234947440640/WqQ358Yw_400x400.jpg'
		}; 

		return (
			<View style={styles.container} >
				<Image source={pic} style={styles.picture} />
				<Text style={styles.titleText}>Hello BE!</Text>

				<Button onPress={() => {
					if (eventsArray.length > 0) {
						navigate('DisplayEvents', { eventsArray });
					} else {
						navigate('Profile');
					}
				}} 
				title="Next" />
			</View>
		);
	}
}

class DisplayEventsScreen extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { navigate } = this.props.navigation;
		const { eventsArray } = this.props.navigation.state.params;
		
		return(
			<View>
				<EventList events={ eventsArray }/>
				<Button onPress={() => navigate('Profile')} title="Create Event" />
			</View>
		);
	}
}

class CreationScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			 chosenDate: new Date(),
			 pickerVal: 'Physical Activity',
		}; 
	}
	
	render() {
		let typeFields = [ 
			  {label: "Basketball", value: "ball"}, 
			  {label: "Food", value: "food"},
			  {label: "Hiking", value: "hike"}
		];

		const { navigate } = this.props.navigation; 

		return (
			<View style={styles.eventContainer} >
				<Text style={styles.creationTitleText}>Create Event</Text>
				<Text style={styles.creationSubText}> Time </Text>
				<DatePickerIOS date={this.state.chosenDate} onDateChange={ date => this.setState({ chosenDate: date})} />
				<Text style={styles.creationSubText}> Type </Text>
			<Picker selectedValue={this.state.pickerVal}  mode="dropdown" onValueChange={(itemVal, itemIndex) => this.setState({pickerVal: itemVal})}>
					<Picker.Item label="Physical Activity" value="Physical"  />
					<Picker.Item label="Food" value="Food"  />
					<Picker.Item label="Explore" value="Explore"  />
					<Picker.Item label="Music" value="Music"  />
				</Picker>
			
				<Button title="Next" onPress={()=> navigate('Invite', {time: this.state.chosenDate, activity: this.state.pickerVal})} />
			</View>

		);
	
	}
}

class InviteScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			 inputText: "Enter Name",
			 namesArray: [], 
		}; 
	}
	
	render() {
		const { navigate } = this.props.navigation;
		const curMoment = moment(this.props.navigation.state.params.time).format("YYYY/DD/MM");
		
		return (
		  <View style={styles.container} >
			 <Text style={styles.creationSubText}> Time</Text>
			 <Text style={styles.creationSubText}> {curMoment} </Text>
			 <Text style={styles.creationSubText}> Activity Type </Text>
			 <Text style={styles.creationSubText}> {this.props.navigation.state.params.activity} </Text>
			 <TextInput style={{height: 40, width: 200, borderColor: 'black', borderWidth: 2, }}  value={this.state.inputText} onChangeText={text => this.setState({ inputText: text })} />

			 <List containerStyle={{marginBottom: 20, width: 200}}>
				{
					allNames.map((l, i) => (
						<ListItem 
							key={i}
							title={l.name}
					onPress={(person) => this.setState({ namesArray: [...this.state.namesArray, l.name, ', '] })}
						/>
					))
				}
			 </List>
		  <Text style={styles.creationSubText}> {this.state.namesArray} </Text> 
		  <Button  title="Chill!"  />
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
	backgroundColor: '#fff',
	alignItems: 'center',
	 
  },
  
  titleText: {
		fontSize: 50,
		fontWeight: 'bold', 
		paddingTop: 60,
		marginTop: 80,
  },
  TopButton: {
		backgroundColor: "#792184", 
  },
});


const App = StackNavigator({
	Home: { screen: HomeScreen },
	Profile: { screen: CreationScreen },
	Invite: {screen: InviteScreen }, 
	DisplayEvents: {screen: DisplayEventsScreen},
}
);

export default App; 