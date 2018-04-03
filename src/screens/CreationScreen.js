import React from 'react';
import { 
	Text, 
	View, 
	Image, 
	Picker,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import { CardList } from 'react-native-card-list';
import Button from '../components/Button';
import styles from './styles/CreationScreenStyle';

const moment = require('moment');
const idLocale = require('moment/locale/id'); 
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
