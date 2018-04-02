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
	Modal,
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

var moment = require('moment');
var idLocale = require('moment/locale/id'); 
moment.locale('id', idLocale);

export default class CreationScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			chosenDate: new Date(),
			picker: false,
			pickerVal: 'Physical Activity',
		};

		this.updateDatePicker = this.updateDatePicker.bind(this);
	}
	
	updateDatePicker() {
		this.setState(prevState => {
			return Object.assign({}, prevState, 
				{
					picker: !this.state.picker,
				}
			);
		});
	}

	toggleModal() {
		this.setState(prevState => {
			return Object.assign({}, prevState, 
				{
					picker: !this.state.picker,
				}
			);
		});
	}

	render() {
		let typeFields = [ 
			{label: "Basketball", value: "ball"}, 
			{label: "Food", value: "food"},
			{label: "Hiking", value: "hike"}
		];
		const { navigate } = this.props.navigation; 

		return (
			<View style={styles.eventContainer}>
				<Text style={styles.creationTitleText}>Create Event</Text>
				<Text style={styles.creationSubText}>Time</Text>
				<Button full title="date" onPress={() => {}}/>
				<Text style={styles.creationSubText}> Type </Text>
				<Picker selectedValue={this.state.pickerVal}  mode="dropdown" onValueChange={(pickerVal, itemIndex) => this.setState({pickerVal})}>
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
			display: 'flex',
    	flexWrap: 'wrap',
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
	modal: {
		alignSelf: 'center',
		height: 'auto',
	},
	datepickerContainer: {
		position: 'absolute',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%',
		width: '100%',
	},
	datepicker: {
		alignSelf: 'center',
		width: '100%',
	},
});