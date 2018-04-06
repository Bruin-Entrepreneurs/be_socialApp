import React from 'react';
import {
	AsyncStorage,
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

import Button from '../components/Button';
import styles from './styles/InviteScreenStyle';
import { BASE_URL_PROD } from '../constants/constants'

const moment = require('moment');
const idLocale = require('moment/locale/id');
moment.locale('id', idLocale);

export default class InviteScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			inputText: '',
			selected: []
		}
	}

	componentDidMount() {
		['access_token', 'refresh_token'].map(val => this._getGlobalState(val))
	}

	render() {
		const curMoment = moment(this.props.navigation.state.params.time).format("YYYY/DD/MM");
		const { navigate } = this.props.navigation;

		return (
			<View style={styles.container} >
				<Text style={styles.creationSubText}> Time</Text>
				<Text style={styles.creationSubText}> {curMoment} </Text>
				<Text style={styles.creationSubText}> Activity Type </Text>
				<Text style={styles.creationSubText}> {this.props.navigation.state.params.eventType} </Text>
				<TextInput 
					style={{height: 40, width: 200, borderColor: 'black', borderWidth: 2, }}  
					placeholder='Enter Name' 
					onChangeText={(text) => this.setState({ inputText: text })} 
				/>
			
				<View>
					{
						!this.state.users ? (
							<Text> Loading </Text>
				        ) : (
							<List containerStyle={{marginBottom: 20, width: 200}}>
								{
									this.state.users.map(
										(user) => (
											<ListItem 
												key={user.id}
												title={user.first_name}
												onPress={(person) => this.setState ({ selected: [...this.state.selected, user.first_name], })}
											/>
										)
									)
								}
							</List>
				        )
				    }
				</View>


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
		)
	}

	_getUsersAsync = async () => {
	    let usersResponse = await fetch(
	    	BASE_URL_PROD + '/user/',
			{
			  method: 'GET',
			  headers: {
			    Accept: 'application/json',
			    'Content-Type': 'application/json',
			    Authorization: 'Bearer ' + this.state.access_token
			  }
			}
		)

    	const usersJson = await usersResponse.json()

    	if (usersResponse.ok) {
    		this.setState({
	    		users: usersJson
	  		})
    	} else {
    		console.log(usersResponse)
    	}
	}

	_getGlobalState = (value) => {
		const data = {}

		AsyncStorage
			.getItem(value)
			.then((val) => {
				data[value] = val
		    	this.setState(data, this._getUsersAsync)
			})
			.catch((e) => console.log(e))
	}
}
