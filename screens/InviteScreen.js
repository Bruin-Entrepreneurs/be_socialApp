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
var moment = require('moment');
var idLocale = require('moment/locale/id');
moment.locale('id', idLocale);

import { CardList } from 'react-native-card-list';


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


export default class InviteScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			 inputText: "Enter Name",
			 namesArray: [],
			 mapNames: allNames,
		}; 
	}

	makePostRequest() {
		// fetch('#URL', {
		// 	method: 'POST', 
		// 	headers: {
		// 		Accept: 'application/json',
		// 		'Content-Type': 'application/json',
		// 	}, 
		// 	body: JSON.stringify({ 
		// 		startTime: curMoment, 

		// 	}), 
		// })
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
