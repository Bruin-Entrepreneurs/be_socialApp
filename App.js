import React from 'react';
import { Alert, DatePickerIOS, StyleSheet, Text, View, AppRegistry, Image, TextInput, Picker, Dimensions, ScrollView, FlatList } from 'react-native';
import { StackNavigator, } from 'react-navigation';
import { List, ListItem, Button, Avatar, Card, } from 'react-native-elements'; 
import { CardList } from 'react-native-card-list';


 var {height, width} = Dimensions.get('window');
//---------------------------------------------------------------
//HOME VIEW SCREEN 

class HomeView extends React.Component {
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
        <Image source={require('./BE.png')} style={styles.picture} />

                <Text style={styles.titleText} >Hello BE!</Text>
         </View>
       <View style={{backgroundColor: 'white', flex: 0.4}}>
	   <TextInput style={styles.textInputLanding} value={this.state.textInputVal} onChangeText={(text) => this.setState({ textInputVal: text })} />
       <TextInput style={styles.textInputLanding} secureTextEntry={true} value={this.state.passwordVal} onChangeText={(text) => this.setState({ passwordVal: text })} />
       <Button style={{marginTop: 20}} color='white' backgroundColor='#2196f3' onPress={() => navigate('UserProfile')} title="Move on" />
        </View>
      </View>
	 
    );
  }
}

//----------------------------------------------------
//CREATION SCREEN 

var moment = require('moment');
var idLocale = require('moment/locale/id'); 
moment.locale('id', idLocale);

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
				<DatePickerIOS date={this.state.chosenDate} onDateChange={(date) => this.setState({ chosenDate: date})} />
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


//-----------------------------------------------------
//INVITE SCREEN


let allNames = [
	{
		name: 'Hao Nguyen', 
		initials: 'HN',
		ImageLink: 'https://pbs.twimg.com/profile_images/862164234947440640/WqQ358Yw_400x400.jpg', 
	},
	{
		name: 'Rahul Sheth',
		initials: 'RS',
		ImageLink: 'https://pbs.twimg.com/profile_images/862164234947440640/WqQ358Yw_400x400.jpg', 
	}, 
	{
		name: 'Hamilton Tran', 
		initials: 'HT',
		ImageLink: 'https://pbs.twimg.com/profile_images/862164234947440640/WqQ358Yw_400x400.jpg', 
	},
	{
		name: 'Michael Yu',
		initials: 'MY',
		ImageLink: 'https://pbs.twimg.com/profile_images/862164234947440640/WqQ358Yw_400x400.jpg',
	}

];
class InviteScreen extends React.Component {
 	constructor(props) {
		super(props);
		this.state = {
	   		 inputText: "Enter Name",
			 namesArray: [],
			 mapNames: allNames,
		}; 
	}

	makePostRequest() {
		fetch('#URL', {
			method: 'POST', 
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			}, 
			body: JSON.stringify({ 
				startTime: curMoment, 

			}), 
		})
	}
	



render() {
        const curMoment = moment(this.props.navigation.state.params.time).format("YYYY/DD/MM")
     	const { navigate } = this.props.navigation;
    	return (
	  	  <View style={styles.container} >
	   		 <Text style={styles.creationSubText}> Time</Text>
	   		 <Text style={styles.creationSubText}> {curMoment} </Text>
	   		 <Text style={styles.creationSubText}> Activity Type </Text>
	       	 <Text style={styles.creationSubText}> {this.props.navigation.state.params.activity} </Text>
	         <TextInput style={{height: 40, width: 200, borderColor: 'black', borderWidth: 2, }}  value={this.state.inputText} onChangeText={(text) => this.setState({ inputText: text })} />
	         
	         <List containerStyle={{marginBottom: 20, width: 200}}>
	         	{
	         		
	         		allNames.map((l, i) => (
	         			<ListItem 
	         				key={i}
	         				title={l.name}
					onPress={(person) => this.setState ({ namesArray: [...this.state.namesArray, l.initials], })}
	         			/>
	         		))
	         	}
	         </List>
		  	  
		  	  	<FlatList
 				 data={this.state.namesArray}
 				 renderItem={({item}) => <Avatar 
 				 							small 
 											rounded
 											title={item}
 											/>}
		  	  	 horizontal={true}
		  	  	/>
		  	 
                <Button  title="Chill!" onPress={() => this.makePostRequest({curMoment})} />
      	  </View>
    );
  }
}

//-------------------------------------------------------
//USER PROFILE SCREEN

class userProfile extends React.Component {
    constructor(props) {
        super(props);
	    this.state = {
	    userName: 'Default',
	    imageURL: 'https://pbs.twimg.com/profile_images/862164234947440640/WqQ358Yw_400x400.jpg',
	    eventsArray: ['None'], 
	};
    }
    componentDidMount() {
	fetch("#API NAME")
	    .then(response => response.json) 
	    .then(data => this.setState({ 
			userName: data.userName,
			imageURL: data.imageURL,
			eventsArray: data.eventsArray,
		    }));
    }
   

    //Need to write fetch request to get profile picture data 
    render() {
	const { navigate } = this.props.navigation;

	return (
			<View style={{ backgroundColor: '#b2d8d8', flex: 1 }} >
			<Avatar 
			containerStyle={curStyle.profilePicture}
			large
			rounded
			source={{ uri: 'https://pbs.twimg.com/profile_images/862164234947440640/WqQ358Yw_400x400.jpg'}}
			/>
			<View style={{ flex: 1, flexDirection: "row"}}>
			<Text style={curStyle.ProfileName}> {this.state.userName} </Text>
			<Button style={{alignSelf: 'flex-end'}} color='white' backgroundColor='#2196f3' title='Change' />
			</View>
       <Button  color='white' backgroundColor='#2196f3' title="Make an Event" onPress={() => navigate('Profile')} />
       <Button style={{marginTop: 20}} color='white' backgroundColor='#2196f3' title="See all Events" onPress={() => navigate('EventPage')} />
			</View>
       
       
       
		); 
    	}

	}

//------------------------------------------------------

class allEvents extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			curCards: [
				{
					id: "0",
					title: "Food",
					picture: require('./BE.png'),
					content: <Text>Big Little Brunch</Text>
				},
				{
					id: "1",
					title: "Movies",
					picture: require('./BE.png'),
					content: <Text> Go see the Oscar Movies</Text>
				},
			]
		};
	}
	render() {

		return (
			<View style={{ flex: 1,}}>
			<CardList cards={this.state.curCards} />
			</View>

		);
	}
}

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
	UserProfile: { screen: userProfile },  
	EventPage: { screen: allEvents },
    });



export default App; 
