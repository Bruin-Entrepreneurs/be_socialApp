import React from 'react';
import {
	Dimensions, 
	FlatList,
	Text,
	TextInput,	
	View,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import {
	Avatar,
	List, 
	ListItem,
} from 'react-native-elements'; 

import { allNames } from '../../dummyData';
import Button from '../components/Button';
import styles from './styles/InviteScreenStyle';

const moment = require('moment');
const idLocale = require('moment/locale/id');
moment.locale('id', idLocale);

export default class InviteScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			inputText: "Enter Name",
			users: allNames,
			selected: [],
		};
	}

	getUsers() {
		/* TO DO */
		/* return all users from api */
	}

	componentDidMount() {
		this.getUsers();	/* user result to populate this.state.users */
	}

	render() {
		const curMoment = moment(this.props.navigation.state.params.time).format("YYYY/DD/MM");
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
						this.state.users.map((l, i) => (
							<ListItem 
								key={i}
								title={l.name}
								onPress={(person) => this.setState ({ selected: [...this.state.selected, l.initials], })}
							/>
						))
					}
				</List>
				<List containerStyle={{marginBottom: 20, width: 200}}>
					{
						this.state.selected.map((l, i) => (
							<ListItem 
								key={i}
								title={l}
							/>
						))
					}
				</List>
				<Button full title="Chill!" />
			</View>
		);
	}
}
